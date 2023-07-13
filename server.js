


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

function request_result (id, res, req, file_name) {

    let login = req.cookies.name;
    let user_id = req.cookies.id;

    console.log(`User: ${login}\nID:${user_id}`)

    let query = `
    SELECT GROUP_CONCAT( DISTINCT groups.group_title) AS group_title, groups.id, work.group_id, work.id AS work_id, work.work_title, work.work_time, work.work_date,
    GROUP_CONCAT(subwork.subwork_title) AS subwork_title, GROUP_CONCAT(subwork.id) AS subwork_id
    FROM b3afpl13xoea4hd5vw9r.groups LEFT JOIN b3afpl13xoea4hd5vw9r.work ON groups.id = work.group_id
    LEFT JOIN b3afpl13xoea4hd5vw9r.subwork ON work.id = subwork.work_id
    WHERE groups.user_id = '${user_id}'
    GROUP BY groups.group_title, groups.id, work.work_title, work.work_time, work.id, work.work_date
    ORDER BY work.work_time
    `;

    let work = [];
    let work_date = [];
    let group_title = [[]];

    conn.query(query, (err, result) => {
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
                    work.push({
                        'id': element.work_id,
                        'group_id': element.group_title,
                        'title': element.work_title,
                        'time': element.work_time,
                        'subworks': element.subwork_title !== null ? element.subwork_title.split(',') : '',
                        'id_subworks': element.subwork_title !== null ? element.subwork_id.split(',') : '',
                    })
                }

                if(!work_date.includes(element.work_date)){
                    work_date.push(element.work_date)
                }
            })

            let emptyGroup = false;

            for(let i = 0; i < work.length; i++){

                const item = work[i]

                if((item.group_id === id && item.title !== null) || id === '0'){
                    if(item.subworks !== [] || id === '0'){

                        emptyGroup = true
                        break
                    }
                }
            }

            group_title.splice(0, 1)

            res.cookie('groups', group_title)

            if(group_title[0] !== null && group_title[0] !== undefined){
                console.log(group_title[0].title)
                res.cookie('first_group', group_title[0].title)
            } else {
                res.cookie('first_group', '0')
            }
            res.cookie('opened_group', id)

            const opened_group = req.cookies.opened_group

            if(req.cookies.name === undefined || req.cookies.id === undefined){
                res.redirect(`/log`);
            } else {
                res.render(createPath(file_name), {id, group_title, work, emptyGroup, login, opened_group, work_date});
            }

        } else {
            console.log(err ? err : 'Array is empty')
            res.redirect("/error_page/error")
        }
    })

    return 0;
}

function subwork(work_id, element){
    console.log(element)
    let sub_insert_query = `INSERT INTO ${`b3afpl13xoea4hd5vw9r.subwork`} (${`id`}, ${`work_id`}, ${`subwork_title`}, ${`subwork_status`}) VALUES (NULL, ${work_id}, '${element}', 0);`

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

    let query = `SELECT  *  FROM ${`b3afpl13xoea4hd5vw9r.users`} WHERE login =  ? AND password = ?`
    conn.query(query, [name, password], (err, result) =>{
        if(Array.isArray(result) && result.length > 0){
            res.cookie('name', result[0].login)
            res.cookie('id', result[0].id)
            res.redirect(`/`)
        } else {
            console.log(err)
            res.redirect("/log")
        }
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

    if(password[0] !== password[1]){
        res.redirect('/reg')
    } else {
        let insert = `INSERT INTO ${`b3afpl13xoea4hd5vw9r.users`} (${`id`}, ${`login`}, ${`password`}, ${`email`}) VALUES (NULL, '${login}', '${password[0]}', '${email}')`

        conn.query(insert, (error) => {
            if(!error){
                res.redirect('/log')
            } else {
                console.log(error)
                res.end('Щось пішло не так. Поверніться на минулу сторінку.');
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
    const opened_group = req.cookies.opened_group
    res.render(createPath('notification'), { login, group_title, opened_group })
})


//User page
app.get('/user', (req, res) => {
    const login = req.cookies.name
    let group_title = req.cookies.groups;
    const opened_group = req.cookies.opened_group
    res.render(createPath('user'), { login, group_title, opened_group });
})

app.get('/user/changelog', (req, res) => {
    const login = req.cookies.name
    let group_title = req.cookies.groups;
    const opened_group = req.cookies.opened_group
    res.render(createPath('changelog'), { login, group_title, opened_group })
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

    console.log("ID:" + work_group);

    const work_time = body.time;
    const work_date = body.calendar;

    let group_id;



    const user_id = req.cookies.id;
    let subtask = body.sub_task_element;

    let select_group_for_id = `SELECT groups.id FROM b3afpl13xoea4hd5vw9r.groups INNER JOIN b3afpl13xoea4hd5vw9r.users ON groups.user_id = users.id WHERE groups.group_title = '${work_group}' AND users.id = '${user_id}'`;

    conn.query(select_group_for_id, (err, result) => {
        group_id = result[0].id;
        if(!err && group_id !== undefined){

            console.log(`Set date: ` + work_date)

            let query = `INSERT INTO ${`b3afpl13xoea4hd5vw9r.work`} (${`id`}, ${`group_id`}, ${`work_title`}, ${`work_time`}, ${`work_date`}) VALUES (NULL, ${group_id}, '${work_title}', '${work_time}', '${work_date}');`;

            conn.query(query, (error) => {
                if(!error){
                    console.log("All ok")
                    res.redirect(`/0`);
                } else {
                    console.log(error)
                }
            })

            if(subtask){
                let select_query = `SELECT id FROM ${`b3afpl13xoea4hd5vw9r.work`} ORDER BY \`work\`.\`id\` DESC LIMIT 1`;
                let work_id = 0;
                conn.query(select_query, (error, result) => {
                    if(error){
                        console.log(error)
                    }
                    work_id = result[0].id;
                    console.log(Array(body.sub_task_element))
                    if(Array.isArray(body.sub_task_element)){

                        body.sub_task_element.forEach(elem => {
                            subwork(work_id, elem);
                        })

                    } else {
                        subwork(work_id, body.sub_task_element);
                    }


                })
            }

        } else {
            console.log(err)
        }
    })
})

//Add group listener

 app.post('/add_group', (req, res) => {
    let body = req.body;

    let group_title = body.group_name;

    let user_id = req.cookies.id

    let query = `INSERT INTO ${`b3afpl13xoea4hd5vw9r.groups`} (${`id`}, ${`user_id`}, ${`group_title`}) VALUES (NULL, ${user_id}, '${group_title}')`;
    conn.query(query, (err) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/0')
        }
    })
})

//Delete subtask and if it's need all task

app.post('/delete_sub_task', (req, res) => {
    const body = req.body;

    const subtask_id = body.subtask_id;
    const checker = body.checker;

    let delete_queue = []
    /*if(!Array.isArray(subtask_id)){
        delete_queue = Array.of(subtask_id)
    }*/
    console.log(delete_queue)
    console.log(subtask_id)


    checker.forEach(element => {
        if(subtask_id.includes(element)){
            delete_queue.push(element)
        }
    })

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



//File not found catcher
app.use((req, res) => {
    res.render(createPath('error'));
});