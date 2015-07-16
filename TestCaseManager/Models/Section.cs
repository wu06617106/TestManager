namespace TestCaseManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Section")]
    public partial class Section
    {
        public Section()
        {
            TestCases = new HashSet<TestCase>();
        }

        public int SectionId { get; set; }

        [Required]
        [StringLength(250)]
        public string SectionTitle { get; set; }

        [StringLength(250)]
        public string SectionDescription { get; set; }

        [StringLength(250)]
        public string ChildSectionIdList { get; set; }

        public virtual ICollection<TestCase> TestCases { get; set; }
    }
}
