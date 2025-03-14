import sys, os, pathlib
from pathlib import Path
sys.path.append(os.path.abspath(str(pathlib.Path(__file__).parent.resolve()) + "/../e2efs"))
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from script_alpha import run_experiment
import aiofiles
import zipfile
app = FastAPI()
import firebase_admin
from firebase_admin import db

cred = firebase_admin.credentials.Certificate(Path("../../tfm-db/private_key.json"))
firebase_admin.initialize_app(cred, {'databaseURL': "https://tfm-bd-3e179-default-rtdb.europe-west1.firebasedatabase.app/"})
ref = db.reference("/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/experiment/")
def expermient(dataset: str, nFeat: str, prec: str, kFolds: str, reps: str, alpha: str, wait: str, implementation: str, codecarbon: str):
    run_experiment(dataset, nFeat, prec, kFolds, reps, alpha, wait, implementation, codecarbon, ref)
    return {"success": [dataset, nFeat, prec, kFolds, reps, alpha, wait, implementation, codecarbon]}

@app.get("/detalle/")
async def detalle(id: str):
    return ref.child("history").child(id).get()

@app.get("/historial/")
async def history():
    historyFb = list(ref.child("history").get().items())
    historyList = []
    for i in range(len(historyFb)):
        historyList.append(historyFb[i][1])
    return historyList 

@app.get("/datasets_list/")
async def get_datasets_list():
    datasetsPath = str(pathlib.Path(__file__).parent.resolve()) + "/../../tfm-backend/e2efs/datasets"
    datasets = [" "]
    datasets += os.listdir(Path(datasetsPath))
    return datasets

@app.get("/exec_info")
async def get_exec_info():
    return ref.child("exec_info").get()


# PARA SUBIR ARCHIVOS, SOLO .ZIP QUE CONTENGA COMPRIMIDOS .DATA Y .LABELS, COMO LOS DATASETS DE FEATURE SELECTION CHALLENGE
@app.put("/dataset/")
async def dataset(file: UploadFile):
    out_file_path = str(pathlib.Path(__file__).parent.resolve()) + str(Path("/../../tfm-backend/e2efs/datasets/" + file.filename))
    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    
    with zipfile.ZipFile(out_file_path, 'r') as zip_ref:
        zip_ref.extractall(out_file_path.replace(".zip", ""))
    
    os.remove(out_file_path)

    return {"success": file}