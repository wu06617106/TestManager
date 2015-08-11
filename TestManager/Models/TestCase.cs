namespace TestCaseManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Web.Mvc;

    [Table("TestCase")]
    public partial class TestCase
    {
        public int TestCaseId { get; set; }

        [Required]
        [StringLength(250)]
        public string TestCaseTitle { get; set; }

        [Required]
        [StringLength(250)]
        public string LastEditPerson { get; set; }

        public int SectionId { get; set; }

        public int TypeId { get; set; }

        public int PriorityId { get; set; }

        [Required]
        [StringLength(250)]
        public string Estimate { get; set; }

        [StringLength(250)]
        public string References { get; set; }

        [UIHint("tinymce_jquery_full"), AllowHtml]
        public string Preconditions { get; set; }

        [UIHint("tinymce_jquery_full"), AllowHtml]
        public string Steps { get; set; }

        [UIHint("tinymce_jquery_full"), AllowHtml]
        public string ExpectedResult { get; set; }

        public virtual Priority Priority { get; set; }

        public virtual Section Section { get; set; }

        public virtual Type Type { get; set; }
    }
}
