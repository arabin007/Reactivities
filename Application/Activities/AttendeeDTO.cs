﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities
{
    public class AttendeeDTO
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string IsHost { get; set; }
        public bool Following { get; set; }
    }
}
