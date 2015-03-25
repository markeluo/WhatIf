using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EcustWhatIfDA
{
    /// <summary>
    /// 三个输入参数
    /// </summary>
    public class EWMITEM
    {
        public EWMITEM() { }
        public EWMITEM(double _FIC2409, double _FIC2414, double _FIC2503)
        {
            FIC2409 = _FIC2409;
            FIC2414 = _FIC2414;
            FIC2503 = _FIC2503;
        }
        public double FIC2409
        {
            set;
            get;
        }
        public double FIC2414
        {
            set;
            get;
        }
        public double FIC2503
        {
            set;
            get;
        }
    }
    public class EWMOUT
    {
        /// <summary>
        /// 乙烷
        /// </summary>
        public double XC2H6
        {
            set;
            get;
        }
        /// <summary>
        /// 乙烯
        /// </summary>
        public double XC2H4
        {
            set;
            get;
        }
        /// <summary>
        /// 能耗
        /// </summary>
        public double XC2H2
        {
            set;
            get;
        }
    }
}
