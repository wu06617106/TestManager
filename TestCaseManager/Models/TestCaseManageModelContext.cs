namespace TestCaseManager.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TestCaseManageModelContext : DbContext
    {
        public TestCaseManageModelContext()
            : base("name=TestCaseManageModelContext")
        {
        }

        public virtual DbSet<Person> Persons { get; set; }
        public virtual DbSet<Priority> Priorities { get; set; }
        public virtual DbSet<Section> Sections { get; set; }
        public virtual DbSet<TestCase> TestCases { get; set; }
        public virtual DbSet<Type> Types { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>()
                .HasMany(e => e.Sections)
                .WithRequired(e => e.Person)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Priority>()
                .HasMany(e => e.TestCases)
                .WithRequired(e => e.Priority)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Section>()
                .HasMany(e => e.TestCases)
                .WithRequired(e => e.Section)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Type>()
                .HasMany(e => e.TestCases)
                .WithRequired(e => e.Type)
                .WillCascadeOnDelete(false);
        }
    }
}
