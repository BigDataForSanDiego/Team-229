from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error
import pandas as pd
import pickle

er_data = pd.read_csv('data/ER_Wait_Times_Data_with_Actual_Time.csv')
er_data['entry_time'] = pd.to_datetime(er_data['entry_time'])
er_data['exit_time'] = pd.to_datetime(er_data['exit_time'])


er_data['wait_time_minutes'] = (er_data['exit_time'] - er_data['entry_time']).dt.total_seconds() / 60

features = ['season', 'actual_time_of_day', 'injury', 'hospital_brand', 'location']
target = 'wait_time_minutes'

preprocessor = ColumnTransformer(
    transformers=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'), features)
    ]
)

er_model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(random_state=42))
])


X = er_data[features]
y = er_data[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

er_model.fit(X_train, y_train)

y_pred = er_model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)

model_path = 'saved_models/ertimes_rbr.pkl'
with open(model_path, 'wb') as f:
    pickle.dump(er_model, f)

print(mae)