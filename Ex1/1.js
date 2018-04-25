// **** Users ****

var user = {};

var users = [];


function AddUser(user){
    if(UserIndexOf(users, user.Name) === -1) {
        users.push(Object.assign({}, user));
        console.log('user: ' + user.Name + ' added!!!');
    }
    else
        console.log('The user is already exists!!!');
}

function DeleteUser(UserName){
    var res = UserIndexOf(users, UserName);
    if(res > -1) {
        users.splice(res, 1);
        console.log('user: ' + UserName + ' deleted!!!');
    }
    else
        console.log('The user not exists!!!');
}

function DisplayUsers(){
    for(var i=0 ; i<users.length ; i++) {
        console.log(users[i]);
    }
}


// **** Groups ****

var groups = [];

function AddGroup(groupName){
    if(IsGroupExists(groupName) === false) {
        groups[groupName] = [];
        console.log('group: ' + groupName + ' added!!!');
    }
    else
        console.log('The group is already exists!!!');
}

function DeleteGroup(groupName){
        var num = Object.keys(groups).length;
        delete groups[groupName];
        if(num > Object.keys(groups).length)
            console.log('group: ' + groupName + ' deleted!!!');
        else
            console.log('The group not exists!!!');
}

function DisplayGroups(){
    for(var key in groups) {
        console.log(key);
    }
}


// **** Users to Groups association ****

function AddUserToGroup(groupName, userName){
    if(IsGroupExists(groupName) === false){
        console.log('The group: ' + groupName + ' is not exists!!!');
        return;
    }

    var res1 = UserIndexOf(users, userName);
    var res2 = UserIndexOf(groups[groupName], userName);


    if(res1 > -1){
        if(res2 === -1) {
            groups[groupName].push(users[res1]);
            console.log('The user: ' + userName + ' has added to group: ' + groupName + '!!!');
        }
        else
            console.log('The user: ' + userName + ' has already exists!!!');
    }
    else{
        console.log('The user: ' + userName + ' is not exists!!!');
    }
}

function RemoveUserFromGroup(groupName, userName){
    if(IsGroupExists(groupName) === false){
        console.log('The group: ' + groupName + ' is not exists!!!');
        return;
    }

    var res1 = UserIndexOf(users, userName);
    var res2 = UserIndexOf(groups[groupName], userName);


    if(res1 > -1){
        if(res2 > -1) {
            groups[groupName].splice(res2, 1);
            console.log('The user: ' + userName + ' has deleted from group: ' + groupName + '!!!');
        }
        else
            console.log('The user: ' + userName + ' has already not exists!!!');
    }
    else{
        console.log('The user: ' + userName + ' is not exists!!!');
    }
}

function DisplayUsersInGroup(group){

}

function DisplayUsersInGroups(){
    Object.keys(groups).length

    for(var key in groups) {
        var str = '';
        for(var i=0 ; i<groups[key].length ; i++){
            str += '    ' + groups[key][i].Name + '(' + groups[key][i].age + ')' + '\n';
        }
        console.log(key + '\n' + str);
    }
}


//  ****  bonus  ****
function updateUser(user){

}




// **** Additional Functions ****

function UserIndexOf(userArray ,userName){
    var res = -1
    for(var i=0 ; i<userArray.length ; i++){
        if(userArray[i].Name === userName){
            res = i;
            break;
        }
    }
    return res;
}


function IsGroupExists(groupName){
    var isExists = false;
    for(var key in groups) {
        if (key === groupName) {
            isExists = true;
            break;
        }
    }
    return isExists;
}

function processInput(answer) {
    switch (answer) {
        case '1':
            rl.question('Enter user name:' + "\n", processUserName);
            break;
        case '2':
            rl.question('Enter user name:' + "\n", processDeleteUser);
            break;
        case '3':
            break;
        case '4':
            DisplayUsers();
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
        case '5':
            rl.question('Enter group name:' + "\n", processAddGroup);
            break;
        case '6':
            rl.question('Enter group name:' + "\n", processDeleteGroup);
            break;
        case '7':
            DisplayGroups();
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
        case '8':
            actionTypeUserGroup = 1;
            rl.question('Enter group name:' + "\n", processUserGroup_g);
            break;
        case '9':
            actionTypeUserGroup = 2;
            rl.question('Enter group name:' + "\n", processUserGroup_g);
            break;
        case '10':
            DisplayUsersInGroups();
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
        case '11':
            process.exit();
            break;
        default:
            console.log(' You dont enter right chooce please try again!!!');
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
    }
}

function processContinue(answer) {
    Main();
}



function processUserName(name) {
    user['Name'] = name;
    rl.question('Enter user password:' + "\n", processUserPassword);
}

function processUserPassword(password) {
    user['password'] = password;
    rl.question('Enter user age:' + "\n", processUserAge);
}

function processUserAge(age) {
    if(isNaN(age) == false) {
        user['age'] = age;
        AddUser(user);
        rl.question('Press any key to continue:' + "\n", processContinue);
    }
    else
        rl.question('Enter user age:' + "\n", processUserAge);
}

function processDeleteUser(name) {
    DeleteUser(name);
    rl.question('Press any key to continue:' + "\n", processContinue);
}



function processAddGroup(name) {
    AddGroup(name);
    rl.question('Press any key to continue:' + "\n", processContinue);
}

function processDeleteGroup(name) {
    DeleteGroup(name);
    rl.question('Press any key to continue:' + "\n", processContinue);
}



function processUserGroup_g(group) {
    tmp_group = group;
    rl.question('Enter user name:' + "\n", processUserGroup_u);
}

function processUserGroup_u(user) {
    if(actionTypeUserGroup === 1)
        AddUserToGroup(tmp_group, user);
    else if(actionTypeUserGroup === 2)
        RemoveUserFromGroup(tmp_group, user);
    rl.question('Press any key to continue:' + "\n", processContinue);
}


var tmp_group;
var actionTypeUserGroup;
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("Wellcome to SqlLabs chat!!!");
Main();



function Main(){
    rl.question(
        "Please chooce a number option:" + "\n" +
        "Users:" + "\n" +
        "   1. Add a user." + "\n" +
        "   2. Remove a user." + "\n" +
        "   3. Update a user." + "\n" +
        "   4. Display a List of users." + "\n" +
        "Groups:" + "\n" +
        "   5. Add a Group." + "\n" +
        "   6. Remove a Group." + "\n" +
        "   7. Display a List of groups" + "\n" +
        "Users to Groups association:" + "\n" +
        "   8. Add user to group." + "\n" +
        "   9. Remove user from group." + "\n" +
        "  10. Display a List of users in groups" + "\n" +
        "11. Exit." + "\n", processInput);

}