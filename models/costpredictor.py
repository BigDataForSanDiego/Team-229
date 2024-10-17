from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pandas as pd
import numpy as np
import pickle
df_san_diego = pd.read_csv('data/San_Diego_Medical_Cost_Data.csv')
X = df_san_diego[['hospital_brand', 'injury', 'location']]
y = df_san_diego['out_of_pocket_cost']

preprocessor = ColumnTransformer(
    transformers=[
        ('onehot', OneHotEncoder(drop='first'), ['hospital_brand', 'injury', 'location'])
    ]
)

pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipeline.fit(X_train, y_train)

train_score = pipeline.score(X_train, y_train)
test_score = pipeline.score(X_test, y_test)

model_filename = 'saved_models/cost_rfr.pkl'
with open(model_filename, 'wb') as f:
    pickle.dump(pipeline, f)

print(train_score, test_score, model_filename)