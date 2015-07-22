namespace TestCaseManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Priority")]
    public partial class Priority
    {
        public Priority()
        {
            TestCases = new HashSet<TestCase>();
        }

        public int PriorityId { get; set; }

        [Required]
        [StringLength(20)]
        public string PriorityName { get; set; }

        public virtual ICollection<TestCase> TestCases { get; set; }
    }
}
