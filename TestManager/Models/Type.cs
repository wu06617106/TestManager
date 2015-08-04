namespace TestCaseManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Type")]
    public partial class Type
    {

        public int TypeId { get; set; }

        [Required]
        [StringLength(30)]
        public string TypeName { get; set; }

    }
}
