using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace daservice
{
    public class EWGroupData
    {
        public string gname
        {
            get;
            set;
        }
        public List<double> ewvalues
        {
            get;
            set;
        }
    }

    public class EWData
    {
        public string gname
        {
            get;
            set;
        }
        public List<EWGroupData> gdata
        {
            get;
            set;
        }
    }
}