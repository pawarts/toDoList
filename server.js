


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
const cookieParser = require('cookie-parser');
const mysql = require('mysql')
const path = require('path')
const nodemailer = require('nodemailer')
const {add} = require("nodemon/lib/rules");
const {createTransport} = require("nodemailer");


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
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8800'); // Замініть на свій домен
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json())
app.use(cookieParser());

app.use(express.urlencoded({extended: false}))


//Create connection with database
const conn = mysql.createConnection({
    host: 'b3afpl13xoea4hd5vw9r-mysql.services.clever-cloud.com',
    databases: 'b3afpl13xoea4hd5vw9r',
    user: 'u9dkrgs0xzzlgt8w',
    password: 'vpCzcYsIEFO7OnSQdBtA',
    port: 3306
})

conn.connect(err => {
    err ? console.log("I can't connect to DB") : console.log("I'm connected to DB")
})

//Functions

function arrayIncludesCondition ( id, array, includes){

    let group_id = includes.group_id;
    const date = includes.work_date;

    const id_checker = id === '0';

    if(id_checker){
        group_id = 0;
    }

    for(let index in array){
        const array_group_id = array[index].group_id;
        const array_date = array[index].work_date;

        let includes_checker = ((group_id == array_group_id) && (date === array_date));

        if(id === '0'){
            includes_checker = date === array_date;
        }

        if(includes_checker){
            return true
        }

    }

    return false
}

function request_result (id, res, req, file_name) {

    let login = req.cookies.name;
    let user_id = req.cookies.id;

    //console.log(`User: ${login}\nID:${user_id}`)

    let query = `
    SELECT GROUP_CONCAT( DISTINCT groups.group_title) AS group_title, groups.id, work.group_id, work.id AS work_id, work.work_title, work.work_time, work.work_date,
    GROUP_CONCAT(subwork.subwork_title) AS subwork_title, GROUP_CONCAT(subwork.id) AS subwork_id
    FROM b3afpl13xoea4hd5vw9r.groups LEFT JOIN b3afpl13xoea4hd5vw9r.work ON groups.id = work.group_id
    LEFT JOIN b3afpl13xoea4hd5vw9r.subwork ON work.id = subwork.work_id
    WHERE groups.user_id = '${user_id}'
    GROUP BY groups.group_title, groups.id, work.work_title, work.work_time, work.id, work.work_date
    ORDER BY work.work_date, work.work_time 
    `;

    let work = [];
    let work_date = [];
    let group_title = [[]];

    conn.query(query, (err, result) => {

        //console.log(result)

        if(!err){

            result.forEach((element) => {

                if(!group_title[0].includes(element.id)){
                    group_title.push({
                        id: element.id,
                        title: element.group_title,
                    });

                    group_title[0].push(element.id)
                }

                if(!work.includes(element.work_title)){
                   //console.log(work_date.includes(element.work_date))
                    work.push({
                        'id': element.work_id,
                        'group_id': element.group_title,
                        'title': element.work_title,
                        'time': element.work_time,
                        'date': arrayIncludesCondition(id, work_date, {
                                "group_id": element.group_id,
                                "work_date": String(element.work_date)
                            }) ? null : String(element.work_date),
                        'subworks': element.subwork_title !== null ? element.subwork_title.split(',') : '',
                        'id_subworks': element.subwork_title !== null ? element.subwork_id.split(',') : '',
                    })
                }

                if(!arrayIncludesCondition(id, work_date, {
                    "group_id": element.group_id,
                    "work_date": String(element.work_date)
                }) && element.work_date !== null){

                    work_date.push({
                        "group_id": element.group_id,
                        "work_date": String(element.work_date)
                    })

                }
            })

            let emptyGroup = false;

            for(let i = 0; i < work.length; i++){

                const item = work[i]

                if(((item.group_id === id || id === '0') && item.title !== null)){
                    if(item.subworks !== []){

                        emptyGroup = true
                        break
                    }
                }
            }


            group_title.splice(0, 1)

            res.cookie('groups', group_title)

            if(group_title[0] !== null && group_title[0] !== undefined){
                //console.log(group_title[0].title)
                res.cookie('first_group', group_title[0].title)
            } else {
                res.cookie('first_group', '0')
            }
            res.cookie('opened_group', id)

            const opened_group = req.cookies.opened_group
            const empty_string_failed = req.cookies.empty_string;
            const add_work_fail = req.cookies.add_work_failed

            if(req.cookies.add_work_failed === undefined){
                //console.log(req.cookies.add_work_failed)
                res.cookie('add_work_failed', {"error": "", "status": false})
            }

            res.cookie('add_work_failed', {"error": "", "status": false})

            if(req.cookies.name === undefined || req.cookies.id === undefined){
                res.redirect(`/log`);
            } else {
                res.render(createPath(file_name), {id, group_title, work, emptyGroup, login, opened_group, work_date, empty_string_failed, add_work_fail});
            }

        } else {
            console.log(err ? err : 'Array is empty')
            res.redirect("/error_page/error")
        }
    })

    return 0;
}

function subwork(work_id, group_id, element){
    let sub_insert_query = `INSERT INTO ${`b3afpl13xoea4hd5vw9r.subwork`} (${`id`}, ${`work_id`}, ${`group_id`}, ${`subwork_title`}, ${`subwork_status`}) VALUES (NULL, ${work_id}, ${group_id}, ?, 0);`

    conn.query(sub_insert_query, [element], (error) => {
        if(error){
            console.log(error);
        }
    });
}

//Request listener

//Login page
app.get('/log', (req, res) => {

    res.cookie("add_work_failed", {"error": "", "status": false})

    const add_work_fail = req.cookies.add_work_failed

    if(add_work_fail.error !== undefined && add_work_fail.error !== ''){
        if(add_work_fail.error !=='Неправильний логін або пароль'){
            res.cookie("add_work_failed", { "error": "", "status": false })}
    }



    res.render(createPath('login'), { add_work_fail })
})

app.post('/log',(req, res) => {

    const {name, password} = req.body

    let query = `SELECT  *  FROM ${`b3afpl13xoea4hd5vw9r.users`} WHERE login =  ? AND password = ?`
    conn.query(query, [name, password], (err, result) =>{
        if(Array.isArray(result) && result.length > 0){
            res.cookie('name', result[0].login)
            res.cookie('id', result[0].id)
            res.cookie('add_work_failed', {"error": "", "status": false})
            res.redirect(`/`)
        } else {
            console.log(err)
            res.cookie('add_work_failed', {"error": "Неправильний логін або пароль", "status": true})
            res.redirect('/log')
        }
    })


})


//Forget page
app.get('/zabudko', (req, res) => {

    const add_work_fail = req.cookies.add_work_failed

    res.render(createPath('forget_password_page'), {  add_work_fail })
})
app.post('/forget_password_email', async (req, res) => {
    const body = req.body;

    let verificationNumber = ``;

    for(let index = 0; index < 6; index++){
        const randomNumber = Math.floor(Math.random() * 10);

        verificationNumber += `${randomNumber}`
    }

    res.cookie("verification_number", verificationNumber)

    const email_select = `SELECT id, email FROM \`b3afpl13xoea4hd5vw9r\`.\`users\` WHERE \`users\`.\`email\` = '${body.email}'`

    conn.query(email_select, (error, result) => {
        if(result !== undefined && result !== null && result.length !== 0){
            //console.log(result.length !== 0)

            if(!error && result.length !== 0){

                res.cookie("forget_user_id", result[0].id)

                const transporter = nodemailer.createTransport({
                    host: 'smtp.office365.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'meoartw@gmail.com',
                        pass: 'FirstLocomotive1808'
                    }
                });

                let mailOptions = {
                    from: 'meoartw@gmail.com',
                    to: body.email,
                    subject: 'Відновлення пошти',
                    text: ``,
                    html: `<p>Код для підтвердження пошти:</p> <h1>${verificationNumber}</h1>`
                };

                // Відправка листа
                transporter.sendMail(mailOptions, (err, info) => {

                        if (err) {
                            console.log('Помилка під час відправки листа:', err);
                        } else if(info !== undefined){
                            console.log('Лист відправлено! Підтвердження:', info);
                        } else {
                            console.log('Лист відправлено!');
                            transporter.close()
                        }
                    });

                res.end(verificationNumber)
            } else if(result !== []) {
                res.end("result")
            }
        }  else {
            console.log(`Щось пішло не так: ${error ? error : result} ${result}`);
            res.end("error")
        }

    })

});
app.post("/verification_code", (req, res) => {
    res.end(req.cookies.verification_number)
})
app.post('/change_password', (req, res) => {

    const body = req.body;
    const id = req.cookies.forget_user_id;

    //console.log(body)

    const change_password = `UPDATE \`b3afpl13xoea4hd5vw9r\`.\`users\` SET \`password\` = '${body.password}' WHERE \`users\`.\`id\` = ${id}`

    conn.query(change_password, (err, result) => {
        if(!err){
            res.json(body)
        } else {
            console.log(err)
            res.end("Error")
        }
    })
})


//Register page
app.get('/reg', (req, res) => {

    const add_work_fail = req.cookies.add_work_failed;

    res.render(createPath('reg'), { add_work_fail })
})
app.post('/reg', (req, res) => {

    res.cookie('add_work_failed', {"error": "", "status": false})

    let body = req.body

    let login = body.login
    let password = body.password
    let email = body.email

    if(password[0] !== password[1]){
        res.cookie('add_work_failed', {"error": "Паролі не сходяться", "status": true})
        res.redirect('/reg')
    } else {

        let select_query = `SELECT * FROM \`b3afpl13xoea4hd5vw9r\`.\`users\` WHERE email = '${email}'`;

        conn.query(select_query, (error, result) => {
            //console.log(result)
            if(!error && result.length === 0){
                let insert = `INSERT INTO ${`b3afpl13xoea4hd5vw9r.users`} (${`id`}, ${`login`}, ${`password`}, ${`email`}) VALUES (NULL, '${login}', '${password[0]}', '${email}')`

                conn.query(insert, (error) => {
                    if(!error){
                        res.redirect('/log')
                    } else {
                        console.log(error)
                        res.redirect('/error_page/error');
                    }
                })
            } else {
                console.log(error)
                res.cookie('add_work_failed', {"error": "Користувач з такою поштою вже існує", "status": true})
                res.redirect('/reg')
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
    const login = req.cookies.name
    const group_title = req.cookies.groups;
    const opened_group = req.cookies.opened_group;
    const add_work_fail = req.cookies.add_work_failed




    res.render(createPath('notification'), { login, group_title, opened_group, add_work_fail})
})


//User page
app.get('/user', (req, res) => {
    const login = req.cookies.name
    let group_title = req.cookies.groups;
    const opened_group = req.cookies.opened_group;

    res.cookie('add_work_failed', {"error": "", "status": false});

    const add_work_fail = req.cookies.add_work_failed

    res.render(createPath('user'), { login, group_title, opened_group, add_work_fail });
})

// I'm refactored function createPath() for changelog's pages

function createPathForChangelogPages (page) {
    return path.resolve(__dirname, 'ejs-module', `./users-page/${page}.ejs`)
}

//Changelog page
app.get('/user/changelog', async(req, res) => {

    const login = req.cookies.name;
    let group_title = req.cookies.groups;
    const opened_group = req.cookies.opened_group;

    res.render(createPathForChangelogPages('changelog'), { login, group_title, opened_group });
})

//Feedback page
app.get('/user/feedback', async(req, res) => {
    res.render(createPathForChangelogPages('feedback'), /*{ login, group_title, opened_group }*/);
});

//Send feedback text
app.post('/user/send_feedback', (req, res) => {

    let body = req.body

    console.log(body)

    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        secureConnection: false,
        port: 587,
        secure: false,
        tls: {
            ciphers: 'SSLv3',
        },
        auth: {
            user: 'meoartw@gmail.com',
            pass: 'FirstLocomotive1808'
        },
    })

    console.log("Sending...")

    const mailOptions = {
        from: '',
        to:'meoartw@gmail.com',
        subject: "I found bugs",
        text: body.textarea
    }


    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            //console.log(error);
            res.end("Error")
        } else {
            console.log('Лист відправлено: ' + info.response);
            res.end("Letter was send")
        }
    });
})


//Main page

app.get('/:id', async(req, res) => {
    const id = req.params.id;
    location = '';

    request_result(id, res, req, 'index');})

app.get('/', (req, res) => {

    if(req.cookies.name === undefined){
        res.redirect(`/log`);
    } else {
        res.redirect(`/${req.cookies.first_group}`);
    }
})

//Search page

app.get('/search/:id', async (req, res) => {
    let id = req.params.id;
    location = 'search/';

    request_result(id, res, req, 'search');
})


//Add work url

app.post('/add_work', async(req, res) =>{

    let body = req.body;

    const work_title = body.work_title;
    const work_group = body.group;

    const work_time = body.time;
    const work_date = body.calendar;

    let group_id;

    //console.log(body)


    const user_id = req.cookies.id;
    let subtask = body.sub_task_element;

    if(work_date !== undefined){
        let select_group_for_id = `SELECT groups.id FROM b3afpl13xoea4hd5vw9r.groups INNER JOIN b3afpl13xoea4hd5vw9r.users ON groups.user_id = users.id WHERE groups.group_title = ? AND users.id = '${user_id}'`;

        conn.query(select_group_for_id, [work_group], (err, result) => {
            group_id = result[0].id;
            if(!err && group_id !== undefined){

                //console.log(`Set date: ` + work_date)

                const query_select = `SELECT * FROM ${`b3afpl13xoea4hd5vw9r.work`} WHERE user_id = ${user_id} AND work_time = '${work_date.split("T")[1]}' AND work_date = '${work_date.split("T" )[0]}'`

                conn.query(query_select, (error, result) => {

                    if(!error && result.length === 0){
                        let query = `INSERT INTO ${`b3afpl13xoea4hd5vw9r.work`} (${`id`}, ${`group_id`}, ${`user_id`}, ${`work_title`}, ${`work_time`}, ${`work_date`}) VALUES (NULL, ${group_id}, ${user_id}, ?, '${work_date.split('T')[1]}', '${work_date.split('T')[0]}');`;

                        conn.query(query, [work_title], (error) => {
                            if(!error){
                                //console.log("All ok");
                                if(!subtask){
                                    res.redirect(`/0`);
                                }
                            } else {
                                console.log(error)
                                res.redirect("/error/error_page")
                            }
                        })

                        if(subtask){
                            let select_query = `SELECT id FROM ${`b3afpl13xoea4hd5vw9r.work`} ORDER BY \`work\`.\`id\` DESC LIMIT 1`;
                            let work_id = 0;
                            conn.query(select_query, (error, result) => {
                                console.log('subtask')
                                if(error){
                                    console.log(error)
                                }
                                work_id = result[0].id;
                                //console.log(Array(body.sub_task_element))
                                if(Array.isArray(body.sub_task_element)){

                                    body.sub_task_element.forEach(elem => {
                                        subwork(work_id, group_id, elem);
                                    });

                                    res.redirect("/0");

                                } else {
                                    subwork(work_id, group_id, body.sub_task_element);
                                    res.redirect("/0");
                                }


                            })
                        }

                        res.cookie('add_work_failed', {"error": "", "status": false})
                    } else {

                        console.log(error ? error : result)
                        console.log(error)

                        res.cookie('add_work_failed', {"error": "Цей час вже зайнятий", "status": true})

                        res.redirect('/0')
                    }
                })

            } else {
                console.log(err)
                res.redirect('/0')
            }
        })
    }
})


//Add group listener

 app.post('/add_group', (req, res) => {
    let body = req.body;

    let group_title = body.group_name;

    let user_id = req.cookies.id;

     res.cookie('empty_string', false)

    if(group_title === ''){
        res.cookie('empty_string', true)
        res.cookie('add_work_failed', {"error": "Пусте поле", "status": true})
        res.redirect('/0')
    } else {
        res.cookie('empty_string', false)
        let query = `INSERT INTO ${`b3afpl13xoea4hd5vw9r.groups`} (${`id`}, ${`user_id`}, ${`group_title`}) VALUES (NULL, ${user_id}, ?)`;
        conn.query(query, [group_title], (err) => {
            if(err){
                console.log(err);
            } else {
                res.redirect('/0')
            }
        })
    }
})


//Delete subtask and if it's need all task

app.post('/delete_sub_task', (req, res) => {
    const body = req.body;

    console.log(body)

    const subtask_id = body.subtask_id;
    const checker = body.checker;

    let delete_queue = []
    /*if(!Array.isArray(subtask_id)){
        delete_queue = Array.of(subtask_id)
    }*/
    console.log(delete_queue)
    console.log(subtask_id)

    console.log(checker)


    if(Array.isArray(checker)){
        checker.forEach(element => {
            if(subtask_id.includes(element)){
                delete_queue.push(element)
            }
        })
    }

    if(!Array.isArray(subtask_id) || subtask_id.length - delete_queue.length === 0){
        console.log('reb')
        const work_id = body.work_id;
        const delete_query = `DELETE FROM \`b3afpl13xoea4hd5vw9r\`.\`work\` WHERE \`work\`.\`id\` = ${work_id}`

        conn.query(delete_query, (error, result) => {
            if(error){
                res.redirect('error_page/error')
            }
        })
    }

    delete_queue.forEach(element =>{

        Number(element)

        const delete_query = `DELETE FROM \`b3afpl13xoea4hd5vw9r\`.\`subwork\` WHERE \`subwork\`.\`id\` = ${element}`

        conn.query(delete_query, (error, result) => {
            if(error){
                console.log(error)
                res.redirect('/error_page/error')
            }
        })
    })

    console.log(subtask_id.length - 1 === 0)
    console.log(subtask_id.length - delete_queue.length === 0)

    res.redirect('/0')

    console.log(delete_queue)
})
app.post('/delete_task', (req, res) => {
    const body = req.body;

    const delete_query = `DELETE FROM \`b3afpl13xoea4hd5vw9r\`.\`work\` WHERE \`work\`.\`id\` = ${body.work_checker}`

    conn.query(delete_query, (err) => {
        if(err){
            console.log(err)
            res.end("err")
        } else {
            res.json(body)
        }
    })
})

app.post('/delete/group', (req, res) => {
    const body = req.body;

    const group_id = body.groups_id;

    console.log(group_id)

    function deleteQueries(query, last) {
        if(!errorCatcher){
            conn.query(query, (error, result) => {
                if(!error && last){
                    res.redirect('/0')
                } else {
                    console.log(error)
                    errorCatcher = true
                    res.redirect('error_page/error')
                }
            })
        }
    }

    let errorCatcher = false;


    const select_query = `SELECT * FROM \`b3afpl13xoea4hd5vw9r\`.\`work\` WHERE \`work\`.\`group_id\` = ${group_id}`

    const query_delete_group = `DELETE FROM \`b3afpl13xoea4hd5vw9r\`.\`groups\` WHERE \`groups\`.\`id\` = ${group_id}`;

    conn.query(select_query, (error, result) => {
        if(!error && result){
            deleteQueries(query_delete_group, true, errorCatcher)
        } else {
            console.log(error)
            deleteQueries(query_delete_group, false, errorCatcher)

            const query_delete_work = `DELETE FROM \`b3afpl13xoea4hd5vw9r\`.\`work\` WHERE \`work\`.\`group_id\` = ${group_id}`;
            deleteQueries(query_delete_work, false, errorCatcher)

            const query_delete_subtask = `DELETE FROM \`b3afpl13xoea4hd5vw9r\`.\`subwork\` WHERE \`subwork\`.\`group_id\` = ${group_id}`;
            deleteQueries(query_delete_subtask, true, errorCatcher)
        }
    })
})



//File not found catcher
app.use((req, res) => {
    res.render(createPath('error'));
});