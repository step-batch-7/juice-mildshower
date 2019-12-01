(echo '[{"beverage":"Orange","empId":1111,"qty":3,"date":"2019-12-02T13:26:02.441Z"},{"beverage":"Banana","empId":123,"qty":3,"date":"2019-12-01T14:36:17.084Z"}]' > AppTests/testStore.json; export JS_STORE_PATH="./AppTests/testStore.json"; node beverage.js --query --date 2019-12-01; rm ./AppTests/testStore.json)
Employee ID,Beverage,Quantity,Date
123,Banana,3,2019-12-01T14:36:17.084Z
Total: 3 Juices