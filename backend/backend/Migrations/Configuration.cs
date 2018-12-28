namespace backend.Migrations
{
    using backend.DataAccessLayer;
    using backend.DataAccessLayer.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<backendContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(backendContext context)
        {
            context.Students.AddOrUpdate(x => x.Id,
                new Student() {
                    Id = 1,
                    Names = "Juan Pablo",
                    Surnames = "López Cifuentes",
                    BirthDate = new DateTime(1999, 06, 08),
                    Phone = "3232519097",
                    Address = "Cra. 71D # 56F 22 Sur",
                    Email = "juanpablolc.g@gmai.com"
                },
                new Student()
                {
                    Id = 2,
                    Names = "Mateo",
                    Surnames = "Rodríguez",
                    BirthDate = new DateTime(1997, 02, 21),
                    Phone = "30012345678",
                    Address = "Calle 1 # 10",
                    Email = "mateo@gmail.com"
                }
                );
            context.Subjects.AddOrUpdate(x => x.Id,
                new Subject()
                {
                    Id = 1,
                    Name = "Cálculo diferencial",
                    Department = "Ingeniería"
                },
                new Subject()
                {
                    Id = 2,
                    Name = "Cálculo integral",
                    Department = "Ingeniería"
                },
                new Subject()
                {
                    Id = 3,
                    Name = "Programación orientada a objetos",
                    Department = "Ingeniería"
                }
                );
        }
    }
}
