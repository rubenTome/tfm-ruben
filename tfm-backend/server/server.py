import sys, os, pathlib
from pathlib import Path
sys.path.append(os.path.abspath(str(pathlib.Path(__file__).parent.resolve()) + "/../e2efs"))
from fastapi import FastAPI
from script_alpha import run_experiment
app = FastAPI()
import json

@app.get("/experiment/")
async def expermient(dataset: str, nFeat: str, prec: str, kFolds: str, reps: str, alpha: str, wait: str, implementation: str, codecarbon: str):
    run_experiment(dataset, nFeat, prec, kFolds, reps, alpha, wait, implementation, codecarbon)
    return {"success": [dataset, nFeat, prec, kFolds, reps, alpha, wait, implementation, codecarbon]}

@app.get("/detalle/")
async def detalle(id: str):
    historyPath = str(pathlib.Path(__file__).parent.resolve()) + "/../../tfm-db/history"
    files = os.listdir(Path(historyPath))
    selectedDir = ""
    for i in range(len(files)):
        if files[i].endswith(id):
            selectedDir = files[i]
            break
    selectedFile = open(Path(historyPath + "/" + selectedDir + "/results_" + id + ".json"), "r")
    dataString = json.loads(selectedFile.read())
    return dataString

@app.get("/historial/")
async def history():
    historyPath = str(pathlib.Path(__file__).parent.resolve()) + "/../../tfm-db/history"
    files = os.listdir(Path(historyPath))
    historicFiles = []
    for i in range(len(files)):
        expFiles = os.listdir(Path(historyPath + "/" + files[i]))
        for j in range(len(expFiles)):
            if expFiles[j].endswith(".json"):
                historicFiles.append(json.load(open(Path(historyPath + "/" + files[i] + "/" + expFiles[j]))))
    return historicFiles