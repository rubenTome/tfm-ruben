import sys, os, pathlib
sys.path.append(os.path.abspath(str(pathlib.Path(__file__).parent.resolve()) + "/../e2efs"))
from fastapi import FastAPI
from script_alpha import run_experiment
app = FastAPI()

# http://127.0.0.1:8000/experiment/colon/10/32/3/5/0.25/25/linear/codecarbon_tracking
@app.get("/experiment/{dataset}/{nFeat}/{prec}/{kFolds}/{reps}/{alpha}/{wait}/{implementation}/{codecarbon}")
async def expermient(dataset: str, nFeat: str, prec: str, kFolds: str, reps: str, alpha: str, wait: str, implementation: str, codecarbon: str):
    run_experiment(dataset, nFeat, prec, kFolds, reps, alpha, wait, implementation, codecarbon)
    return {"success": [dataset, nFeat, prec, kFolds, reps, alpha, wait, implementation, codecarbon]}