FROM python:3.9.5

WORKDIR /tfm-backend
COPY / .
RUN pip install fastapi[standard] codecarbon torch==2.6.0 torchmetrics==1.6.1 torchvision==0.21.0 firebase-admin lightning==2.5.0.post0
CMD ["fastapi", "dev", "server/server.py"]