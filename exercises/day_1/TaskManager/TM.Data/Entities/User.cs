﻿using System;
using System.Collections.Generic;
using System.Text;

namespace TM.Data.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
    }
}
