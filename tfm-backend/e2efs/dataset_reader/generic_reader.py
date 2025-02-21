import os
import numpy as np
from scipy.special import erf
from pathlib import Path

def load_dataset(datasetName):
    directory = str(Path(__file__).parent.resolve()) + str(Path('/../datasets/' + datasetName + "/" + datasetName))
    dataset = load_data(directory)
    return dataset


def load_data(source):
    info = {
        'train': {}, 'validation': {}, 'test': {}, 'raw': {}
    }

    file = source + '_train.labels'
    info['train']['label'] = np.loadtxt(file, dtype=np.int16)
    info['train']['label'][info['train']['label'] < 0] = 0

    file = source + '_train.data'
    info['train']['data'] = np.loadtxt(file, dtype=np.int16).astype(np.float32)

    file = source + '_test.data'
    info['test']['data'] = np.loadtxt(file, dtype=np.int16).astype(np.float32)

    file = source + '_valid.labels'
    info['validation']['label'] = np.loadtxt(file, dtype=np.int16)
    info['validation']['label'][info['validation']['label'] < 0] = 0

    file = source + '_valid.data'
    info['validation']['data'] = np.loadtxt(file, dtype=np.int16).astype(np.float32)

    info['raw']['data'] = np.concatenate((info['train']['data'], info['validation']['data']))
    info['raw']['label'] = np.concatenate((info['train']['label'], info['validation']['label']))

    return info


class Normalize:

    def __init__(self):
        self.stats = None

    def fit(self, X):
        mean = np.mean(X, axis=0)
        std = np.sqrt(np.square(X - mean).sum(axis=0) / max(1, len(X) - 1))
        self.stats = (mean, std)

    def transform(self, X):
        transformed_X = erf((X - self.stats[0]) / (np.maximum(1e-6, self.stats[1]) * np.sqrt(2.)))
        return transformed_X

    def fit_transform(self, X):
        self.fit(X)
        return self.transform(X)
