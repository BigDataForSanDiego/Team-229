from sklearn.metrics import mean_absolute_error
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

y_train_pred = pipeline.predict(X_train)
y_test_pred = pipeline.predict(X_test)

train_mae = mean_absolute_error(y_train, y_train_pred)
test_mae = mean_absolute_error(y_test, y_test_pred)

model_filename = 'saved_models/cost_rfr.pkl'
with open(model_filename, 'wb') as f:
    pickle.dump(pipeline, f)

print(train_mae, test_mae, model_filename)