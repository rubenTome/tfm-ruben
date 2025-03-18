FROM python:3.9.5

RUN pip install fastapi[standard] codecarbon torch==2.6.0 torchmetrics==1.6.1 torchvision==0.21.0
WORKDIR /tfm-backend/server
CMD ["fastapi", "dev", "server.py"]