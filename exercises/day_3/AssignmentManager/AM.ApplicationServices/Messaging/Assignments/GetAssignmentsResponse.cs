﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AM.ApplicationServices.Messaging.Assignments
{
    public class GetAssignmentsResponse : ServiceResponseBase
    {
        public IEnumerable<AssignmentViewModel> Assignments { get; set; }
    }
}
