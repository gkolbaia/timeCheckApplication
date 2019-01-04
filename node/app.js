const express = require('express'),
    fs = require('fs');
bodyParser = require('body-parser');
cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/saveStaff', function (req, res) {
    let result = fs.readFileSync("../timeCheckApp/src/app/staff_data/staffs.json", 'utf8');
    let data = JSON.parse(result);
    data.push(req.body);
    fs.writeFile("../timeCheckApp/src/app/staff_data/staffs.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log(err);
        }
        res.json(req.body);
    });
});
app.post('/getStaff', function (req, res) {
    let result = fs.readFileSync("../timeCheckApp/src/app/staff_data/staffs.json", 'utf8');
    res.json(JSON.parse(result))

});



app.post('/putStaff', function (req, res) {
    let result = fs.readFileSync("../timeCheckApp/src/app/staff_data/staffs.json", 'utf8');
    let data = JSON.parse(result);
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === req.body.id) {
            data.splice(i, 1);
        }
    };
    data.push(req.body);
    fs.writeFile("../timeCheckApp/src/app/staff_data/staffs.json", JSON.stringify(data), function (err) {
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
})
app.post('/getStaffInfo', function (req, res) {
    let result = fs.readFileSync("../timeCheckApp/src/app/staff_data/staff-personal.json", 'utf8');
    res.json(JSON.parse(result))

});


app.listen(8000, () => {
    console.log('Server listening on port ' + 8000);
});
