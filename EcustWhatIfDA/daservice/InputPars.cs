using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace daservice
{
    public class InputPars
    {
       public string ctype
        {
            get;
            set;
        }
       public double cvalue
        {
            get;
            set;
        }
       public List<InputParitem> citems
       {
           get;
           set;
       }
    }
    public class InputParitem
    {
        public string ipname
        {
            get;
            set;
        }
        public double ipvalue
        {
            get;
            set;
        }
       public List<double> ipitems
        {
            get;
            set;
        }
    }
    public enum InputType
    { 
        DA452,
        DA402
    }
}