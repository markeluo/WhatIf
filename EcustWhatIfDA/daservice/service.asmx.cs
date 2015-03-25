using EcustWhatIfDA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace daservice
{
    /// <summary>
    /// service 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class service : System.Web.Services.WebService
    {
        JavaScriptSerializer serializer = new JavaScriptSerializer();

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public void getinitdata(string jsonData)
        //{
        //    try
        //    {
        //        //Dictionary<string, object> json = (Dictionary<string, object>)serializer.DeserializeObject(jsonData);
        //        //if (!string.IsNullOrEmpty(json["datagroup"].ToString()))
        //        //{
        //            //输入参数
        //            Dictionary<string, List<double>> items = new Dictionary<string, List<double>>();
        //            items.Add("FIC2409", new List<double>{ 65, 85 });
        //            items.Add("FIC2414", new List<double> { 210, 355 });
        //            items.Add("FIC2503",new  List<double>{ 75, 190 });

        //            //X轴随机数处理
        //            RandomXValueManager(items);

        //            //返回值结果类
 

        //           List<double> ewlist = null;
        //           List<double> returnvalue = null;
        //           Dictionary<string, List<EWPointValue>> _managerlist = new Dictionary<string, List<EWPointValue>>();
        //           int index = 0;

        //           List<string> keys = new List<string>() { "乙烷", "乙烯", "能耗"};
 
        //            #region 造数据处理
        //            for (var i = 0; i < 20; i++)
        //           {
        //               ewlist = new List<double>();

        //               foreach (var item in items)
        //               {
        //                   ewlist.Add(item.Value[i]);
        //               }
        //               returnvalue = EcustWhatIfDA452.EWManager(ewlist);
        //               if (i == 0)
        //               {
        //                   for (var rowindex=0;rowindex<keys.Count;rowindex++)
        //                   {
        //                       _managerlist.Add(keys[rowindex], new List<EWPointValue>() { new EWPointValue(ewlist[rowindex], returnvalue[rowindex]) });
        //                   }
        //               }
        //               else
        //               {
        //                   List<EWPointValue> templist = null;
        //                   for (var rowindex = 0; rowindex < keys.Count; rowindex++)
        //                   {
        //                       templist=_managerlist[keys[rowindex]];
        //                       templist.Add(new EWPointValue(ewlist[rowindex], returnvalue[rowindex]));
        //                   }
        //               }
        //           }
        //            #endregion

        //            List<EWGroupData> list = new List<EWGroupData>();
        //            EWGroupData dataitem=null;
        //            foreach (var item in _managerlist)
        //            {
        //                dataitem=new EWGroupData ();
        //                dataitem.gname=item.Key;
        //                dataitem.ewvalues=item.Value;
        //                list.Add(dataitem);
        //            }

        //            string returnstr = ObjToJson.ToJson(list);
        //            Comm.Output("{ \"result\" : \"true\",\"message\":\"执行成功\",\"groupdata\":" + returnstr + " }");
        //        //}
        //    }
        //    catch (Exception ex)
        //    {
        //        Comm.ResultError(ex.Message);
        //    }
        //}

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void getewdata(string jsonData) 
        {
            try
            {
                Dictionary<string, object> json = (Dictionary<string, object>)serializer.DeserializeObject(jsonData);
                InputPars parse = null;
                if (!string.IsNullOrEmpty(json["data"].ToString()))
                {
                    parse = serializer.ConvertToType<InputPars>(json["data"]);
                }

                List<EWData> datalist = new List<EWData>();
                for (var i = 0; i < parse.citems.Count; i++)
                {
                    datalist.Add( GetData(parse.citems, i, parse.ctype, parse.cvalue,InputType.DA452));
                }

                string returnstr = "";
                //returnstr=ObjToJson.ToJson(datalist);
                returnstr = serializer.Serialize(datalist);
                Comm.OutPutjson("{ \"result\" : \"true\",\"message\":\"执行成功\",\"groupdata\":" + returnstr + " }");
            }
            catch (Exception ex)
            {
                Comm.ResultError(ex.Message);
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void getewdata452(string jsonData)
        {
            try
            {
                Dictionary<string, object> json = (Dictionary<string, object>)serializer.DeserializeObject(jsonData);
                InputPars parse = null;
                if (!string.IsNullOrEmpty(json["data"].ToString()))
                {
                    parse = serializer.ConvertToType<InputPars>(json["data"]);
                }

                List<EWData> datalist = new List<EWData>();
                for (var i = 0; i < parse.citems.Count; i++)
                {
                    datalist.Add(GetData(parse.citems, i, parse.ctype, parse.cvalue, InputType.DA452));
                }

                string returnstr = "";
                //returnstr=ObjToJson.ToJson(datalist);
                returnstr = serializer.Serialize(datalist);
                Comm.OutPutjson("{ \"result\" : \"true\",\"message\":\"执行成功\",\"groupdata\":" + returnstr + " }");
            }
            catch (Exception ex)
            {
                Comm.ResultError(ex.Message);
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void getewdata402(string jsonData)
        {
            try
            {
                Dictionary<string, object> json = (Dictionary<string, object>)serializer.DeserializeObject(jsonData);
                InputPars parse = null;
                if (!string.IsNullOrEmpty(json["data"].ToString()))
                {
                    parse = serializer.ConvertToType<InputPars>(json["data"]);
                }

                List<EWData> datalist = new List<EWData>();
                for (var i = 0; i < parse.citems.Count; i++)
                {
                    datalist.Add(GetData(parse.citems, i, parse.ctype, parse.cvalue, InputType.DA402));
                }

                string returnstr = "";
                //returnstr=ObjToJson.ToJson(datalist);
                returnstr = serializer.Serialize(datalist);
                Comm.OutPutjson("{ \"result\" : \"true\",\"message\":\"执行成功\",\"groupdata\":" + returnstr + " }");
            }
            catch (Exception ex)
            {
                Comm.ResultError(ex.Message);
            }
        }

        public EWData GetData(List<InputParitem> _items,int _index,string _strtype,double _doua,InputType _Itype)
        {
            EWData temp = new EWData();
            try
            {
                double tempDvalue = 0;
                temp.gname = _items[_index].ipname;

                switch (_strtype)
                { 
                    case "1":
                        temp = DataManager1(_items, _index, _doua, temp, tempDvalue, _Itype);
                       break;
                    case "2":
                       temp = DataManager2(_items, _index, _doua, temp, tempDvalue, _Itype);
                        break;
                    case "3":
                        temp = DataManager3(_items, _index, _doua, temp, tempDvalue, _Itype);
                        break;
                    default:
                        break;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return temp;
        }

        /// <summary>
        /// 类型1处理
        /// </summary>
        /// <param name="_items"></param>
        /// <param name="_index"></param>
        /// <param name="_doua"></param>
        /// <param name="temp"></param>
        /// <param name="tempDvalue"></param>
        /// <returns></returns>
        private EWData DataManager1(List<InputParitem> _items, int _index, double _doua, EWData temp, double tempDvalue, InputType _Itype)
        {
            if (_index == 0)
            {
                tempDvalue = _items[1].ipvalue;
            }
            else
            {
                tempDvalue = _items[0].ipvalue;
            }
            List<EWMOUT> outputlist = new List<EWMOUT>();
            EWMITEM inputItem = null;
            IcustWhatIfDAManager DA = null;
            switch (_Itype)
            {
                case InputType.DA402:
                    DA = new EcustWhatIfDA402();
                    break;
                case InputType.DA452:
                    DA = new EcustWhatIfDA452();
                    break;
                default:
                    DA = new EcustWhatIfDA452();
                    break;
            }
            for (var i = 0; i < _items[_index].ipitems.Count; i++)
            {
                inputItem = new EWMITEM();
                inputItem.FIC2409 = _doua;
                if (_items[_index].ipname == "FIC2414")
                {
                    inputItem.FIC2414 = _items[_index].ipitems[i];
                    inputItem.FIC2503 = tempDvalue;
                }
                else
                {
                    inputItem.FIC2414 = tempDvalue;
                    inputItem.FIC2503 = _items[_index].ipitems[i];
                }
                outputlist.Add(DA.EWManager(inputItem));
            }
            temp.gdata = EWResultConvert(outputlist);
            return temp;
        }

        /// <summary>
        /// 类型2处理
        /// </summary>
        /// <param name="_items"></param>
        /// <param name="_index"></param>
        /// <param name="_doua"></param>
        /// <param name="temp"></param>
        /// <param name="tempDvalue"></param>
        /// <returns></returns>
        private EWData DataManager2(List<InputParitem> _items, int _index, double _doua, EWData temp, double tempDvalue, InputType _Itype)
        {
            if (_index == 0)
            {
                tempDvalue = _items[1].ipvalue;
            }
            else
            {
                tempDvalue = _items[0].ipvalue;
            }
            List<EWMOUT> outputlist = new List<EWMOUT>();
            EWMITEM inputItem = null;
            IcustWhatIfDAManager DA = null;
            switch (_Itype)
            {
                case InputType.DA402:
                    DA = new EcustWhatIfDA402();
                    break;
                case InputType.DA452:
                    DA = new EcustWhatIfDA452();
                    break;
                default:
                    DA = new EcustWhatIfDA452();
                    break;
            }

            for (var i = 0; i < _items[_index].ipitems.Count; i++)
            {
                inputItem = new EWMITEM();
                inputItem.FIC2414 = _doua;
                if (_items[_index].ipname == "FIC2409")
                {
                    inputItem.FIC2409 = _items[_index].ipitems[i];
                    inputItem.FIC2503 = tempDvalue;
                }
                else
                {
                    inputItem.FIC2409 = tempDvalue;
                    inputItem.FIC2503 = _items[_index].ipitems[i];
                }
                outputlist.Add(DA.EWManager(inputItem));
            }
            temp.gdata = EWResultConvert(outputlist);
            return temp;
        }

        /// <summary>
        /// 类型3处理
        /// </summary>
        /// <param name="_items"></param>
        /// <param name="_index"></param>
        /// <param name="_doua"></param>
        /// <param name="temp"></param>
        /// <param name="tempDvalue"></param>
        /// <returns></returns>
        private EWData DataManager3(List<InputParitem> _items, int _index, double _doua, EWData temp, double tempDvalue, InputType _Itype)
        {
            if (_index == 0)
            {
                tempDvalue = _items[1].ipvalue;
            }
            else
            {
                tempDvalue = _items[0].ipvalue;
            }
            List<EWMOUT> outputlist = new List<EWMOUT>();
            EWMITEM inputItem = null;

            IcustWhatIfDAManager DA = null;
            switch (_Itype)
            {
                case InputType.DA402:
                    DA = new EcustWhatIfDA402();
                    break;
                case InputType.DA452:
                    DA = new EcustWhatIfDA452();
                    break;
                default:
                    DA = new EcustWhatIfDA452();
                    break;
            }
            for (var i = 0; i < _items[_index].ipitems.Count; i++)
            {
                inputItem = new EWMITEM();
                inputItem.FIC2503 = _doua;
                if (_items[_index].ipname == "FIC2409")
                {
                    inputItem.FIC2409 = _items[_index].ipitems[i];
                    inputItem.FIC2414 = tempDvalue;
                }
                else
                {
                    inputItem.FIC2409 = tempDvalue;
                    inputItem.FIC2414 = _items[_index].ipitems[i];
                }
                outputlist.Add(DA.EWManager(inputItem));
            }
            temp.gdata = EWResultConvert(outputlist);
            return temp;
        }


        /// <summary>
        /// 结果类转换
        /// </summary>
        /// <param name="outputlist"></param>
        /// <returns></returns>
        private List<EWGroupData> EWResultConvert(List<EWMOUT> outputlist)
        {
            List<EWGroupData> datalist = new List<EWGroupData>();
            if (outputlist != null && outputlist.Count > 0)
            {
                List<string> keys = new List<string>() { "乙烷", "乙烯", "能耗" };
                Dictionary<string, List<double>> items = new Dictionary<string, List<double>>();
                for (var i = 0; i < keys.Count; i++)
                { 
                    items.Add(keys[i],new List<double>());
                }
                
                for (var i = 0; i < outputlist.Count; i++)
                {
                    items["乙烷"].Add(outputlist[i].XC2H6);
                    items["乙烯"].Add(outputlist[i].XC2H4);
                    items["能耗"].Add(outputlist[i].XC2H2);
                }

                EWGroupData ewgitem=null;
                foreach (var item in items)
                { 
                    ewgitem=new EWGroupData ();
                    ewgitem.gname=item.Key;
                    ewgitem.ewvalues=item.Value;
                    datalist.Add(ewgitem);
                }
            }
            return datalist;
        }
    }
}
