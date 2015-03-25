using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using System.Data;
using Newtonsoft.Json;

namespace EcustWhatIfDA
{
    public class EcustWhatIfDA452 : IcustWhatIfDAManager
    {
        [DllImport("WHATIFDA452.dll")]
        private extern static double DA452A(double HYFIC2409PV, double HYFIC2414PV, double HYFIC2503PV);
        [DllImport("WHATIFDA452.dll")]
        private extern static double DA452B(double HYFIC2409PV, double HYFIC2414PV, double HYFIC2503PV);
        [DllImport("WHATIFDA452.dll")]
        private extern static double DA452C(double HYFIC2409PV, double HYFIC2414PV, double HYFIC2503PV);
 
        public  DataTable WhatIfDA(DataTable inputData)
        {
            double HYFIC2409PV = 0;
            double HYFIC2414PV = 0;
            double HYFIC2503PV = 0;

            foreach (DataRow dr in inputData.Rows)
            {
                string varTag = dr["TagName"].ToString();

                switch (varTag)
                {
                    case "HYFIC2409PV":
                        HYFIC2409PV = double.Parse(dr["value"].ToString());
                        break;
                    case "HYFIC2414PV":
                        HYFIC2414PV = double.Parse(dr["value"].ToString());
                        break;
                    case "HYFIC2503PV":
                        HYFIC2503PV = double.Parse(dr["value"].ToString());
                        break;
 
                }
            }
            double value1 = DA452A( HYFIC2409PV,  HYFIC2414PV,  HYFIC2503PV);
            double value2 = DA452B(HYFIC2409PV, HYFIC2414PV, HYFIC2503PV);
            double value3 = DA452C(HYFIC2409PV, HYFIC2414PV, HYFIC2503PV);



            DataTable varResult = new DataTable();
            varResult.Columns.Add("BatchTime");
            varResult.Columns.Add("TagName");
            varResult.Columns.Add("Value");

            DataRow drDA452_XC2H6 = varResult.NewRow();
            drDA452_XC2H6["BatchTime"] = System.DateTime.Now.ToString();
            drDA452_XC2H6["TagName"] = "DA452_XC2H6";
            drDA452_XC2H6["value"] = value1.ToString("f6");
            varResult.Rows.Add(drDA452_XC2H6);

            DataRow drDA452_XC2H4 = varResult.NewRow();
            drDA452_XC2H4["BatchTime"] = System.DateTime.Now.ToString();
            drDA452_XC2H4["TagName"] = "DA452_XC2H4";
            drDA452_XC2H4["value"] = value2.ToString("f6");
            varResult.Rows.Add(drDA452_XC2H4);


            DataRow drDA452_energy_comsumpution = varResult.NewRow();
            drDA452_energy_comsumpution["BatchTime"] = System.DateTime.Now.ToString();
            drDA452_energy_comsumpution["TagName"] = "DA452_energy_comsumpution";
            drDA452_energy_comsumpution["value"] = value3.ToString("f6");
            varResult.Rows.Add(drDA452_energy_comsumpution);



            return varResult;
        }

        /// <summary>
        /// 修改后计算方法
        /// </summary>
        /// <param name="_items">输入参数计划key:位号名称,value:X输入值</param>
        /// <returns></returns>
        public  EWMOUT EWManager(EWMITEM items)
        {
            EWMOUT outitem = new EWMOUT();
            double tempdouble = DA452A(items.FIC2409, items.FIC2414, items.FIC2503);
            string srA = tempdouble.ToString("f6");
            outitem.XC2H6 =Math.Abs(Convert.ToDouble(srA));

            tempdouble = DA452B(items.FIC2409, items.FIC2414, items.FIC2503);
            srA = tempdouble.ToString("f6");
            outitem.XC2H4 = Math.Abs(Convert.ToDouble(srA));


            tempdouble = DA452C(items.FIC2409, items.FIC2414, items.FIC2503);
            srA = tempdouble.ToString("f6");
            outitem.XC2H2 = Math.Abs(Convert.ToDouble(srA));

            return outitem;
        }
    }
}
