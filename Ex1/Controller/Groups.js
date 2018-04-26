function Groups(){
    this.groups = [];
}

Groups.prototype={
    AddGroup:
    function AddGroup(groupName){
        if(this.IsGroupExists(this.groups, groupName) === false) {
            this.groups[groupName] = [];
            console.log('group: ' + groupName + ' added!!!');
        }
        else
            console.log('The group is already exists!!!');
    },

    DeleteGroup:
    function DeleteGroup(groupName){
        var num = Object.keys(this.groups).length;
        delete this.groups[groupName];
        if(num > Object.keys(this.groups).length)
            console.log('group: ' + groupName + ' deleted!!!');
        else
            console.log('The group not exists!!!');
    },

    DisplayGroups:
    function DisplayGroups (){
        for(var key in this.groups) {
            console.log(key);
        }
    },

    IsGroupExists:
    function IsGroupExists(groupArray, groupName){
        for(var key in groupArray) {
            if (key === groupName) {
                return true;
            }
        }
        return false;
    }
};


module.exports = Groups;