using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestCaseManager.Models
{
    public class TestCaseDTO
    {
        public int TestCaseId { get; set; }

        public string TestCaseTitle { get; set; }

        public string LastEditPerson { get; set; }

        public int SectionId { get; set; }

        public int TypeId { get; set; }

        public int PriorityId { get; set; }

        public string Estimate { get; set; }

        public string References { get; set; }

        public string Preconditions { get; set; }

        public string Steps { get; set; }

        public string ExpectedResult { get; set; }
    }
}