"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Parent_1 = require("./Parent");
var Supervisor_1 = require("./Supervisor");
var Attendance_1 = require("./Attendance");
var Bus_1 = require("./Bus");
var Coordinates_1 = require("./Coordinates");
var Student = /** @class */ (function () {
    function Student() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Student.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ length: 50 }),
        __metadata("design:type", String)
    ], Student.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column('date'),
        __metadata("design:type", Date)
    ], Student.prototype, "dateOfBirth", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Student.prototype, "age", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Student.prototype, "classNumber", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Student.prototype, "level", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "parent_mail", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "supervisor_mail", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Parent_1.Parent; }, function (parent) { return parent.students; }),
        __metadata("design:type", Parent_1.Parent)
    ], Student.prototype, "parent", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Supervisor_1.Supervisor; }, function (supervisor) { return supervisor.students; }),
        __metadata("design:type", Supervisor_1.Supervisor)
    ], Student.prototype, "supervisor", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Attendance_1.Attendance; }, function (attendance) { return attendance.student; }),
        __metadata("design:type", Array)
    ], Student.prototype, "attendances", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Bus_1.Bus; }, function (bus) { return bus.students; }),
        __metadata("design:type", Bus_1.Bus)
    ], Student.prototype, "bus", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Coordinates_1.Coordinates; }),
        __metadata("design:type", Coordinates_1.Coordinates)
    ], Student.prototype, "pickupCoordinate", void 0);
    Student = __decorate([
        typeorm_1.Entity()
    ], Student);
    return Student;
}());
exports.Student = Student;
//# sourceMappingURL=Student.js.map