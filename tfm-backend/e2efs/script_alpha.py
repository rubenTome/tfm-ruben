from dataset_reader import colon, leukemia, lung181, lymphoma, dexter, gina, gisette, madelon
import numpy as np
import e2efs
import pandas as pd
from codecarbon import EmissionsTracker
import os
import sys
from sklearn.model_selection import RepeatedStratifiedKFold
from sklearn.metrics import balanced_accuracy_score
import time
import shutil
import json

results_dir = "../../tfm-db/last_experiment/results"

def run_experiment(ds, n_features_to_select, precision, k_folds, N, fi, wait, network, codecarbon_tracking):
    exec_info = {}
    try:
        startTime = int(time.time())
        rankingMean = np.array([])
        #conversions from string to int
        n_features_to_select = int(n_features_to_select)
        k_folds = int(k_folds)
        N = int(N)
        fi = float(fi)
        wait = int(wait)
        if precision == "16":
            precision = "16-true"
        if codecarbon_tracking == "usar_codecarbon":
            codecarbon_tracking = True
        else:
            codecarbon_tracking = False
        net = "conv"
        if network == "lineal":
            net = None

        if os.path.exists(results_dir):
            shutil.rmtree(results_dir)
        os.mkdir(results_dir)

        #CREATE DICTIONARY WITH EXECUTION INFO, AND WRITING TO A JSON FILE
        exec_info = {
            "ds": ds,
            "n_features_to_select": n_features_to_select,
            "precision": precision,
            "k_folds": k_folds,
            "N": N,
            "fi": fi,
            "wait": wait,
            "net": network,
            "codecarbon_tracking": codecarbon_tracking,

            "status": "ejecucion",
            "errorMessage": "",
            "progress": 0,
            "id": startTime
        }
        
        max_progress = k_folds * N
        json_exec_info = json.dumps(exec_info)
        json_file = open(results_dir + "/../../exec_info.json", "w")
        json_file.write(json_exec_info)
        json_file.close()
        
        print("Precision:", precision)
        kfold = RepeatedStratifiedKFold(n_splits=k_folds, n_repeats=N, random_state=42)
        
        #select dataset
        if ds == "colon":
            selectedDs = colon
            print("selected colon dataset")
        elif ds == "leukemia":
            selectedDs = leukemia
            print("selected leukemia dataset")
        elif ds == "lung":
            selectedDs = lung181
            print("selected lung dataset")
        elif ds == "lymphoma":
            selectedDs = lymphoma
            print("selected lymphoma dataset")
        elif ds == "dexter":
            selectedDs = dexter
            print("selected dexter dataset")
        elif ds == "gina":
            selectedDs = gina
            print("selected gina dataset")
        elif ds == "gisette":
            selectedDs = gisette
            print("selected gisette dataset")
        elif ds == "madelon":
            selectedDs = madelon
            print("selected madelon dataset")

        if net == None:
            netStr = ""
        else:
            netStr = "_" + net

        if not os.path.exists(results_dir + "/results_" + ds + netStr):
            os.mkdir(results_dir + "/results_" + ds + netStr)
        os.mkdir(results_dir + "/results_" + ds + netStr + "/fp" + precision)
        os.mkdir(results_dir + "/results_" + ds + netStr + "/fp" + precision + "/csv")
        os.mkdir(results_dir + "/results_" + ds + netStr + "/fp" + precision + "/stats")
        
        #set up directory names and csv columns
        df = pd.DataFrame(columns=["test_acc", "balanced_acc", "nfeat", "max_alpha", "emissions", "duration"])
        if net == "conv":
            directory = results_dir + "/results_" + ds + "_conv/fp" + precision
        else:
            directory = results_dir + "/results_" + ds + "/fp" + precision
        name = ds + "_a" + str(round(fi, 4)) + "_fp" + precision
        csv_file = open(directory + "/csv/" + name + ".csv", "w")
        f = open(directory + "/stats/" + name + ".txt", "w")

        ## LOAD DATA
        dataset = selectedDs.load_dataset()
        raw_data = np.asarray(dataset['raw']['data'])
        raw_label = np.asarray(dataset['raw']['label']).reshape(-1)
        num_classes = len(np.unique(raw_label))
        normalize = selectedDs.Normalize()
        
        for j, (train_index, test_index) in enumerate(kfold.split(raw_data, raw_label)):
            print('k_fold', j, 'of', k_folds*N)

            train_data, train_label = raw_data[train_index], raw_label[train_index]
            test_data, test_label = raw_data[test_index], raw_label[test_index]

            train_data = normalize.fit_transform(train_data)
            test_data = normalize.transform(test_data)

            #if convolutional implementation is chosen
            if net == "conv":
                print("SELECTED CONV IMPLEMENTATION")
                train_data = train_data[:, :, np.newaxis]
                test_data = test_data[:, :, np.newaxis]
                train_data = np.reshape(train_data, (train_data.shape[0], 1, train_data.shape[1]))
                test_data = np.reshape(test_data, (test_data.shape[0], 1, test_data.shape[1]))
            else:
                print("SELECTED LINEAR IMPLEMENTATION")      

            valid_features = np.where(np.abs(train_data).sum(axis=0) > 0)[0]
            if len(valid_features) < train_data.shape[1]:
                print('Removing', train_data.shape[1] - len(valid_features), 'zero features')
                train_data = train_data[:, valid_features]
                test_data = test_data[:, valid_features]

            train_label = np.array(train_label).astype(int)
            test_label = np.array(test_label).astype(int)

            print("features to select:", n_features_to_select)
            
            #kfold rep tracker starts monitoring here
            if codecarbon_tracking:
                tracker = EmissionsTracker(measure_power_secs=1, log_level="critical", tracking_mode="process")
                tracker.start()
            else:
                tracker = time.time()
            
            ## LOAD E2EFSSoft model
            model = e2efs.E2EFSSoft(n_features_to_select=n_features_to_select, wait=wait, feature_importance=fi, precision=precision, network=net)
            ## FIT THE SELECTION
            model.fit(train_data, train_label, validation_data=(test_data, test_label), batch_size=2, max_epochs=2000)
            ## FINETUNE THE MODEL
            #model.fine_tune(train_data, train_label, validation_data=(test_data, test_label), batch_size=2, max_epochs=100)
            
            #kfold rep tracker stops monitoring here
            if codecarbon_tracking:
                tracker.stop()
                csvf = pd.read_csv("emissions.csv")
                emissions = csvf["emissions"].values[0]
                duration = csvf["duration"].values[0]
                os.remove("emissions.csv")
            else:
                emissions = -1
                duration = time.time() - tracker
            
            ## GET THE MODEL RESULTS
            metrics = model.evaluate(test_data, test_label)
            print(metrics)
            predicted = model.predict(test_data)
            predicted = [np.argmax(i) for i in predicted]
            balanced_acc = balanced_accuracy_score(predicted, test_label)
            print("BALANCED ACCURACY:", balanced_acc)
            ## GET THE MASK
            mask = model.get_mask()
            print('MASK:', mask)
            ## GET THE RANKING
            ranking = model.get_ranking()
            if len(rankingMean) == 0:
                rankingMean = np.array(ranking)
            else:
                rankingMean += np.array(ranking)
            print('RANKING:', ranking)
            nf = model.get_nfeats()
            print("NUMBER OF FEATURES:", nf)
            print("ALPHA MAX:", fi)
            if j > 0:
                df.loc[j] = [round(metrics["test_accuracy"], 4), round(balanced_acc, 4), nf, fi, emissions, duration]
                df.to_csv(directory + "/csv/" + name + ".csv", index=False)
            exec_info.update({"progress": int(j / max_progress * 100)})
            json_exec_info = json.dumps(exec_info)
            json_file = open(results_dir + "/../../exec_info.json", "w")
            json_file.write(json_exec_info)
            json_file.close()
            
        #write stats and global emissions
        f.write(df.describe().to_string())
        exec_info.update({"status": "finalizado"})
        exec_info.update({"progress": 100})
        json_exec_info = json.dumps(exec_info)
        json_file = open(results_dir + "/../../exec_info.json", "w")
        json_file.write(json_exec_info)
        json_file.close()
        historyDir = "../../tfm-db/history/experiment_" + str(startTime)
        shutil.copytree(results_dir, historyDir)
        #WRITE RESULTS TO A JSON FILE TO HISTORIC
        rankingMean = rankingMean / (N * k_folds)
        rankingMean = rankingMean.tolist()
        results_dict = {
            "dataset": ds,
            "n_features_to_select": n_features_to_select,
            "precision": precision,
            "k_folds": k_folds,
            "N": N,
            "fi": fi,
            "wait": wait,
            "net": network,
            "codecarbon_tracking": codecarbon_tracking,

            "id": startTime,

            "results": df.to_dict(),

            "ranking": rankingMean
        }
        results_json = json.dumps(results_dict)
        results_json_file = open(historyDir + "/results_" + str(startTime) + ".json", "w")
        results_json_file.write(results_json)
        results_json_file.close()

    except  Exception as e:
        print(e)
        exec_info.update({"status": "error"})
        exec_info.update({"errorMessage": str(e)})
        json_exec_info = json.dumps(exec_info)
        json_file = open(results_dir + "/../../exec_info.json", "w")
        json_file.write(json_exec_info)
        json_file.close()
        return 
