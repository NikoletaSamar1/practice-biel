﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AM.ApplicationServices.ViewModels
{
    public class AssignmentViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StatedOn { get; set; }
        public DateTime EndedOn { get; set; }
        public bool IsActive { get; set; }
    }
}
