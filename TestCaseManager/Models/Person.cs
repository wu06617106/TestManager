namespace TestCaseManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Person")]
    public partial class Person
    {
        public Person()
        {
            Sections = new HashSet<Section>();
        }

        public int PersonId { get; set; }

        [Required]
        [StringLength(250)]
        public string Account { get; set; }

        [Required]
        [StringLength(250)]
        public string Password { get; set; }

        [Required]
        [StringLength(250)]
        public string PersonName { get; set; }

        [StringLength(250)]
        public string ChildSectionIdList { get; set; }

        public virtual ICollection<Section> Sections { get; set; }
    }
}
