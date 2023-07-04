

/*  !!!!!!!   It's just for simulation repair this   !!!!!!!  */

let group_array = [
    {
        "id" : 0,
        "group_title" : "Мій день",
        "group_items" : [
            {
                "time" : "08:00",
                "work_title" : "Прокинутись",
                "sub_work" : [
                    "Прокинутись",
                    "Прокинувся",
                ]
            },
            {
                "time" : "08:00",
                "sub_work_title" : "Прокинутись",
                "sub_work" : [
                    "Прокинутись",
                    "Прокинувся",
                ]
            },
        ]
    },
    {
        "id": 1,
        "group_title" : "Авто групи",
        "group_items" : [
            {
                "time" : "09:00",
                "sub_work_title" : "Прокинутись",
                "sub_work" : [
                    "Прокинутись",
                    "Прокинувся",
                ]
            },
            {
                "time" : "10:30",
                "sub_work_title" : "Прокинутись",
                "sub_work" : [
                    "Прокинутись",
                    "Прокинувся",
                ]
            },
        ]
    },
    {
        "id": 2,
        "group_title" : "Уроки",
        "group_items" : [
            {
                "time" : "11:00",
                "sub_work_title" : "Прокинутись",
                "sub_work" : [
                    "Прокинутись",
                    "Прокинувся",
                ]
            },
            {
                "time" : "15:26",
                "sub_work_title" : "Прокинутись",
                "sub_work" : [
                    "Прокинутись",
                    "Прокинувся",
                ]
            },
        ]
    },
    {
        "id": 3,
        "group_title" : "Коти",
        "group_items" : [
            {
                "time" : "19:00",
                "sub_work_title" : "Прокинутись",
                "sub_work" : [
                    "Прокинутись",
                    "Прокинувся",
                ]
            },
            {
                "time" : "00:00",
                "sub_work_title" : "Прокинутись",
                "sub_work" : [
                    "Прокинутись",
                    "Прокинувся",
                ]
            },
        ]
    },
]

let location








//Require ejs-module
const express = require('express')
const fs = require('fs')
const mysql = require('mysql')
const path = require('path')
const url = require('url')
/*const bodyParser = require('body-parser')
const encoder = bodyParser.urlencoded()*/


//Check login or not login
let login = 'DF'
let user_id = 1


//Connect config to database
const config = require('./config')

//Server creator
const app = express()

app.set('view-engine', 'ejs')

//Listened port
const PORT = 8800

//Function create path
const createPath = (page) => path.resolve(__dirname, 'ejs-module', `${page}.ejs`)


//Server launcher
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`I'm listen port: ${PORT}`)
})

//Middleware components
app.use('/styles', express.static(__dirname + '/styles'))
app.use('/images', express.static(__dirname + '/images'))
app.use('/scripts', express.static(__dirname + '/scripts'))


app.use(express.urlencoded({extended: false}))

//Create connection with database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    databases: 'just_do_it',
    password: ''
})

conn.connect(err => {
    err ? console.log("I can't connect to DB") : console.log("I'm connected to DB")
})


//Functions

let group_title_array = [[]];

function request_result (id, res, req, file_name) {

    let id_array = [];
    let work_array = [[]];
    let sub_work_object = [[]];
    //let sub_work = [];

    let query = `SELECT ${`users.login`}, ${`groups.group_title`}, ${`work.work_title`}, ${`work.id`}, ${`work.work_time`}, ${`subwork.subwork_title`}, ${`subwork.work_id`}, ${`subwork.subwork_status`}, ${`work.group_id`} FROM ${`just_do_it.groups`} LEFT JOIN ${`just_do_it.work`} ON ${`groups.id`} = ${`work.group_id`} INNER JOIN ${`just_do_it.users`} ON ${`users.id`} = ${`groups.user_id`} LEFT JOIN ${`just_do_it.subwork`} ON ${`work.id`} = ${`subwork.work_id`} WHERE ${`groups.user_id`} = ${`users.id`} AND ${`users.login`} = 'User' ORDER BY \`work\`.\`work_time\``;

    conn.query(query, (err, result, field) => {
        console.time("Sorted time")
        if(Array.isArray(result) && result.length > 0) {
            console.log(result)

            result.forEach(subwork => {

                if(sub_work_object.length != 0){
                    sub_work_object.forEach((item, index) => {
                        if(id == subwork.group_title && !sub_work_object[0].includes(subwork.subwork_title)){

                            sub_work_object[0].push(subwork.subwork_title)

                            sub_work_object.push({
                                "id": subwork.id,
                                "subwork_title": subwork.subwork_title
                            })
                        }

                        /*if(item.subwork_title == sub_work_object[index - 1] && index > 1){
                            sub_work_object.splice(-1)
                        }*/

                        /*if(id == subwork.group_title && subwork.subwork_title == undefined && !sub_work.includes(subwork.subwork_title)){
                            sub_work.push(subwork.subwork_title);
                        }*/
                    })
                }


            });

            result.forEach(element => {

                if(work_array.length != 0){

                    work_array.forEach(item => {
                        if(!work_array[0].includes(element.id)){
                            if(item.id != element.id && id == element.group_title) {

                                work_array.push({
                                    "id": element.id,
                                    "time": element.work_time,
                                    "title": element.work_title,
                                });

                                work_array[0].push(element.id);
                            }
                        }
                    });

                } else {

                    if(id == element.group_title) {

                        work_array.push({
                            "id": element.id,
                            "time": element.work_time,
                            "title": element.work_title,
                        });

                    }
                }

                if(!id_array.includes(element.id)){
                    id_array.push(element.id);
                }

                if(!group_title_array[0].includes(element.group_title)){

                    group_title_array[0].push(element.group_title)

                    group_title_array.push({
                        "id" : element.group_id,
                        "title": element.group_title
                    });
                }

                /*sub_work_object.forEach(subwork => {
                    //In this line was mistake
                    if(id == element.group_title && !sub_work.includes(subwork.subwork_title)){
                        sub_work.push(subwork.subwork_title);
                    }
                })*/


            });

            /*if (sub_work[0] === undefined){
                sub_work.splice(0, 1);
            }*/

            sub_work_object.splice(0, 1);
            work_array.splice(0, 1);


            console.log('Group array')
            console.log(group_title_array)
            console.log('Work array')
            console.log(work_array)
            console.log('Subwork object')
            console.log(sub_work_object)



            res.render(createPath(file_name), { login, id, group_array, location, result, group_title_array, work_array, sub_work_object });
        } else {
            console.log(err ? err : 'Array is empty')
            res.end("Error 404")
        }
        console.timeEnd("Sorted time")
    })
}

function subwork(work_id, element){
    let sub_insert_query = `INSERT INTO ${`just_do_it.subwork`} (${`id`}, ${`work_id`}, ${`subwork_title`}, ${`subwork_status`}) VALUES (NULL, ${work_id}, '${element}', 0);`

    conn.query(sub_insert_query, (error) => {
        if(error){
            console.log(error);
        }
    });
}

//Request listener

//Login page
app.get('/log', (req, res) => {
    res.render(createPath('login'))
})

app.post('/log',(req, res) => {

    const {name, password} = req.body

    let query = `SELECT  ${`login`}, ${`password`}, ${`id`}  FROM ${`just_do_it.users`} WHERE login =  ? AND password = ?`
    conn.query(query, [name, password], (err, result, field) =>{
        if(Array.isArray(result) && result.length > 0){
            res.redirect('/0')
            login = name
            user_id = result.id
        } else {
            console.log(err)
            res.redirect("/log")
        }

        res.end()
    })


})

//Register page
app.get('/reg', (req, res) => {
    res.render(createPath('reg'))
})
app.post('/reg', (req, res) => {

    let body = req.body

    let login = body.login
    let password = body.password
    let email = body.email

    if(password[0] != password[1]){
        res.redirect('/reg')
    } else {
        let insert = `INSERT INTO ${`just_do_it.users`} (${`id`}, ${`login`}, ${`password`}, ${`email`}) VALUES (NULL, '${login}', '${password[0]}', '${email}')`

        conn.query(insert, (error) => {
            if(!error){
                res.redirect('/log')
            } else {
                console.log(error)
            }
        })
    }
})

//Routers


app.get('/exit', (req, res) => {
    login = ''
    res.redirect('/log')
    res.render(createPath('login'), { login })
});

//Notification page
app.get('/notification', (req, res) => {
    res.render(createPath('notification'), { login, group_title_array })
})

//User page
app.get('/user', (req, res) => {
    res.render(createPath('user'), { login, group_title_array });
})


//Main page


/* Request test */
app.get('/request_test', (req, res) => {

    let query = `SELECT *  FROM ${`just_do_it.groups`} WHERE groups.group_title = "Lesson" AND groups.user_id = 1`;
     //query = `INSERT INTO ${`just_do_it.work`} (${`id`}, ${`group_id`}, ${`work_title`}, ${`work_time`}) VALUES (NULL, '', 'This must delete', '-2:00')`;
    let select_group_for_id = `SELECT groups.id FROM just_do_it.groups INNER JOIN just_do_it.users ON groups.user_id = users.id WHERE group_title = 'Lesson' AND users.login = 'DF'`

    conn.query(select_group_for_id, (err, res) => {
        if(!err) {

            console.log(res[0].id)
        } else {
            console.log('Line 437:\n' + err)
        }
    })
    conn.query(query, (err, result, field) =>{
        if(Array.isArray(result) && result.length > 0) {
        } else {
            console.log(err)
        }
        res.end(`${err ? err : result}`)
    })

})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    location = '';

    request_result(id, res, req, 'index');

    console.log("Index")
})

app.get('/', (req, res) => {
    res.redirect(`/0`);
})

//Search page

app.get('/search/:id', (req, res) => {
    let id = req.params.id
    location = 'search/'

    request_result(id, res, req, 'search');
})

//Add work url

app.post('/add_work', (req, res) => {

    let body = req.body

    const work_title = body.work_title;
    const work_group = body.group;

    console.log("ID:" + work_group)

    const work_hour = body.hour
    const work_minute = body.minute;

    let group_id

    const work_time = `${work_hour}:${work_minute}`;

    let select_group_for_id = `SELECT groups.id FROM just_do_it.groups INNER JOIN just_do_it.users ON groups.user_id = users.id WHERE groups.group_title= '${work_group}' AND users.login = 'DF'`

    conn.query(select_group_for_id, (err, result) => {
        group_id = result[0].id
        if(!err){

            let query = `INSERT INTO ${`just_do_it.work`} (${`id`}, ${`group_id`}, ${`work_title`}, ${`work_time`}) VALUES (NULL, ${group_id}, '${work_title}', '${work_time}');`;

            conn.query(query, (error, result) => {
                if(!error){
                    console.log("All ok")
                    res.redirect(`/0`);
                } else {
                    console.log(error)
                }
            })
        } else {
            console.log(err)
        }
    })
    su
    let select_query = `SELECT \`id\` FROM ${`just_do_it.work`} ORDER BY \`work\`.\`id\` DESC LIMIT 1`;
    let work_id = 0;

    let subtask = body.sub_task_element;

    console.log("Sub: " + subtask)

    if(subtask){
        conn.query(select_query, (error, result) => {
            if(error){
                console.log(error)
            }
            work_id = result[0].id;

            if(!String(subtask)){

                subtask.forEach(elem => {
                    subwork(work_id, elem);
                })
            } else {
                subwork(work_id, subtask);
            }


        })
    }
})

//Add group listener

app.post('/add_group', (req, res) => {
    let body = req.body;

    let group_title = body.group_name;

    console.log(user_id)

    let query = `INSERT INTO ${`just_do_it.groups`} (${`id`}, ${`user_id`}, ${`group_title`}) VALUES (NULL, ${user_id}, '${group_title}')`;
    conn.query(query, (err) => {
        if(err){
            console.log(err);
        }
    })
    res.end("OK")
})



//File not found catcher
app.use((req, res) => {
    res.render(createPath('error'));
});