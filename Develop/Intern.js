class Intern {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.school = school; 
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return 'Engineer';
    }
    getSchool() {
        return this.school;
    }
}
module.exports = Intern;