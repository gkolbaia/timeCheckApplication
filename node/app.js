const express = require('express'),
    fs = require('fs');
bodyParser = require('body-parser');
cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/saveStaff', function (req, res) {

    let data = readFileDB("../timeCheckApp/src/app/staff_data/staffs.json");

    if (!data) {
        data = [];
    }
    data.push(req.body);

    fs.writeFile("../timeCheckApp/src/app/staff_data/staffs.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
        res.json(req.body);
    });
});
app.post('/getStaff', function (req, res) {
    let result = readFileDB("../timeCheckApp/src/app/staff_data/staffs.json");
    res.json(result);
});
function readFileDB(fileUrl) {
    let isSuccessfullyParsed = false;
    let counter = 0;
    let interval = null;
    let result = null;

    let resultStr = fs.readFileSync(fileUrl, 'utf8');
    result = JSON.parse(resultStr);
    return result;

    // (
    //     interval = setInterval( () => {
    //         try {
    //             counter++;
    //             let resultStr = fs.readFileSync(fileUrl, 'utf8', );
    //             result = JSON.parse(resultStr);
    //             isSuccessfullyParsed = true;
    //         } catch (ex) {
    //             if(counter > 10){
    //                 isSuccessfullyParsed = true;
    //             }
    //         }
    //     }, 1000)    
    // )();
    // while(!isSuccessfullyParsed){
    //     if(counter > 0) {
    //     }
    // }
    // clearInterval(interval);
    // return result;
};
app.post('/putStaff', function (req, res) {
    let result = fs.readFileSync("../timeCheckApp/src/app/staff_data/staffs.json", 'utf8');
    let data = JSON.parse(result);
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === req.body.id) {
            data[i].workingTime = req.body.workingTime
            for (const key in data[i]) {
                if (data[i].hasOwnProperty(key)) {
                    const element = data[i][key];
                    if (element !== req.body[key]) {
                        data[i][key] = req.body[key]
                    }
                }
            }
        }
    };
    for (let i = 0; i < data.length; i++) {
        data[i].showPersonParameter = false;
    }
    fs.writeFile("../timeCheckApp/src/app/staff_data/staffs.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
        res.json(req.body);
    });
});
app.post('/putStaffTimingInfo', function (req, res) {
    let result = fs.readFileSync("../timeCheckApp/src/app/staff_data/staff-timing.json", 'utf8');
    let data = JSON.parse(result);
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === req.body.id) {
            data.splice(i, 1);

        }
    };
    data.push(req.body);
    fs.writeFile("../timeCheckApp/src/app/staff_data/staff-timing.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
        res.json(req.body);
    });
});
app.post('/deleteStaff', function (req, res) {
    let result = fs.readFileSync("../timeCheckApp/src/app/staff_data/staffs.json", 'utf8');
    let data = JSON.parse(result);
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === req.body.id) {
            data.splice(i, 1);
        }
    };

    fs.writeFile("../timeCheckApp/src/app/staff_data/staffs.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
        res.json(req.body);
    });
});
app.post('/getStaffInfo', function (req, res) {
    let result = fs.readFileSync("../timeCheckApp/src/app/staff_data/staff-timing.json", 'utf8');
    res.json(JSON.parse(result))

});
app.post('/saveStaffInfo', function (req, res) {
    let data = readFileDB("../timeCheckApp/src/app/staff_data/staff-timing.json", 'utf8')
    data.push(req.body);
    fs.writeFile("../timeCheckApp/src/app/staff_data/staff-timing.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
        res.json(req.body);
    });
});
app.post('/saveEnterAndLeaveTimes', function (req, res) {
    let data = readFileDB("../timeCheckApp/src/app/staff_data/staff-timing.json", 'utf8')
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === req.id) {
            for (let j = 0; j < data[i].timing.length; i++) {
                if (data[i].timing[j].date === req.date) {
                    data[i].timing[j].enterAndLeaveTImes.push(req.times)
                } else {
                    let newDateTiming = {
                        data: new Date().toDateString(),
                        enterAndLeaveTImes: [req.time],
                    }
                    data[i].timing.push(newDateTiming);
                }
            }
        }
    }
    fs.writeFile("../timeCheckApp/src/app/staff_data/staff-timing.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
        res.json(req.body);
    });
});
app.post('/deleteStaffTimingInfo', function (req, res) {
    let result = fs.readFileSync("../timeCheckApp/src/app/staff_data/staff-timing.json", 'utf8');
    let data = JSON.parse(result);
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === req.body.id) {
            data.splice(i, 1);
        }
    };
    fs.writeFile("../timeCheckApp/src/app/staff_data/staff-timing.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
        res.json(req.body);
    });
});
app.listen(8000, () => {
    console.log('Server listening on port ' + 8000);
});