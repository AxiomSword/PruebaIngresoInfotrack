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
                    BirthDate = new DateTime(1999, 06, 08)
                }
                );
        }
    }
}
