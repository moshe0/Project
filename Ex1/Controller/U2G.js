const UsersType = require('./../Controller/Users');
const GroupsType = require('./../Controller/Groups');


function U2G(u, g) {
    this.users = u;
    this.groups = g;
}

U2G.prototype= {
        AddUserToGroup:
        function AddUserToGroup(groupName, userName) {
            var resStr = '';
            if (GroupsType.prototype.IsGroupExists(this.groups, groupName) === false) {
                resStr = 'The group: ' + groupName + ' is not exists!!!';
                return resStr;
            }

            var res1 = UsersType.prototype.UserIndexOf(this.users, userName);
            var res2 = UsersType.prototype.UserIndexOf(this.groups[groupName], userName);


            if (res1 > -1) {
                if (res2 === -1) {
                    this.groups[groupName].push(this.users[res1]);
                    resStr = 'The user: ' + userName + ' has added to group: ' + groupName + '!!!';
                }
                else
                    resStr = 'The user: ' + userName + ' has already exists!!!';
            }
            else {
                resStr = 'The user: ' + userName + ' is not exists!!!';
            }
            return resStr;
        },
        RemoveUserFromGroup:
        function RemoveUserFromGroup(groupName, userName) {
            var resStr = '';
            if (GroupsType.prototype.IsGroupExists(this.groups, groupName) === false) {
                resStr = 'The group: ' + groupName + ' is not exists!!!';
                return resStr;
            }

            var res1 = UsersType.prototype.UserIndexOf(this.users, userName);
            var res2 = UsersType.prototype.UserIndexOf(this.groups[groupName], userName);


            if (res1 > -1) {
                if (res2 > -1) {
                    this.groups[groupName].splice(res2, 1);
                    resStr = 'The user: ' + userName + ' has deleted from group: ' + groupName + '!!!';
                }
                else
                    resStr = 'The user: ' + userName + ' has already not exists!!!';
            }
            else {
                resStr = 'The user: ' + userName + ' is not exists!!!';
            }
            return resStr;
        },

        RemoveUserFromGroups:
        function RemoveUserFromGroups(userName){
            for (var key in this.groups) {
                this.RemoveUserFromGroup(key, userName);
            }
        },

        AddUserToGroups:
        function AddUserToGroups(userName){
            for (var key in this.groups) {
                this.AddUserToGroup(key, userName);
            }
        },

        DisplayUsersInGroups:
        function DisplayUsersInGroups() {

            for (var key in this.groups) {
                var str = '';
                for (var i = 0; i < this.groups[key].length; i++) {
                    str += '    ' + this.groups[key][i].Name + '(' + this.groups[key][i].Age + ')' + '\n';
                }
                console.log(key + '\n' + str);
            }
        }
}

module.exports = U2G;