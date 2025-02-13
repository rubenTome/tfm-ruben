import sys, os, pathlib
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
    files = os.listdir(historyPath)
    selectedDir = ""
    for i in range(len(files)):
        if files[i].endswith(id):
            selectedDir = files[i]
            break
    selectedFile = open(historyPath + "/" + selectedDir + "/results_" + id + ".json", "r")
    dataString = json.loads(selectedFile.read())
    return dataString

@app.get("/historial/")
async def history():
    return (["1738152118", "1738152118", "1738152118", "1738152118", "1738152118"])