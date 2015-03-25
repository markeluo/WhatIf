using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Xml;

namespace daservice
{
    /// <summary> 
    /// 将DataTable或Ilist<>转换成JSON格式 
    /// </summary> 
    public class ObjToJson
    {
        //DataTable转成Json 
        public static string ToJson(DataTable dt)
        {
            StringBuilder Json = new StringBuilder();
            Json.Append("{\"d\":[");
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Json.Append("{");
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        Json.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":\"" + dt.Rows[i][j].ToString() + "\"");
                        if (j < dt.Columns.Count - 1)
                        {
                            Json.Append(",");
                        }
                    }
                    Json.Append("}");
                    if (i < dt.Rows.Count - 1)
                    {
                        Json.Append(",");
                    }
                }
            }
            Json.Append("]}");
            return Json.ToString();
        }

        /// <summary>选取自定义的列生成json字符串</summary>
        /// <param name="tableSource">数据库查询结果</param>
        /// <param name="fields">需要添加进来的字段名</param>
        /// <returns></returns>
        public static string ToJson(DataTable tableSource, string jsonName, params string[] fields)
        {
            if (fields.Count() < 1)
                throw new Exception("fields count must be 1 or more");//至少要转化一列
            string jsonData = "{'" + jsonName + "':[";

            if (tableSource.Rows.Count > 0)
            {
                foreach (DataRow row in tableSource.Rows)
                {
                    jsonData += "{";
                    for (int i = 0; i < fields.Length; i++)
                        jsonData += "'" + fields[i] + "':'" + row[fields[i]] + "',";
                    jsonData = jsonData.Substring(0, jsonData.Length - 1);
                    jsonData += "},";
                }
                jsonData = jsonData.Substring(0, jsonData.Length - 1);
                jsonData += "]}";
            }
            else
            {
                jsonData += "]}";
            }
            return jsonData;
        }
        public static string Dtb2Json(DataTable dt)
        {
            string Jss = "[";
            if (dt.Rows.Count > 0)
            {
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (i == 0)
                            Jss += "{name: '" + dt.Columns[j].ColumnName + "',data: [";
                        else if (i == dt.Rows.Count - 1)
                            Jss += Convert.ToString(dt.Rows[i][j]) + "]},";
                        else
                            Jss += Convert.ToString(dt.Rows[i][j]) + ",";
                    }

                }
            }
            Jss = Jss.Remove(Jss.Length - 1) + "]";
            return Jss;
        }
        public static string Dlt2Json<T>(IList<T> IL)
        {

            StringBuilder Jss = new StringBuilder("[");
            if (IL != null)
            {
                for (int j = 0; j < IL.Count; j++)
                {
                    string[] textS = IL[j].ToString().Split(',');

                    for (int i = j; i < j + 1; i++)
                    {
                        if (i == 0)
                        {
                            Jss.Append("{name:'" + textS[i].Split('=')[0] + "', ");
                            Jss.Append("data:[" + textS[i].Split('=')[1] + ", ");
                        }
                    }
                    if (j == textS.Length - 1)
                        Jss.Append(textS[j].Split('=')[1] + "]},");
                    else
                        Jss.Append(textS[j].Split('=')[1] + ",");
                }
            }
            return Jss.ToString();
        }

        /// <summary>
        /// DataTable转成Json 
        /// </summary>
        /// <param name="jsonName"></param>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static string DataTableToJson(string jsonName, DataTable dt)
        {
            StringBuilder Json = new StringBuilder();
            Json.Append("{\"" + jsonName + "\":[");
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Json.Append("{");
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        Json.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":\"" + dt.Rows[i][j].ToString() + "\"");
                        if (j < dt.Columns.Count - 1)
                        {
                            Json.Append(",");
                        }
                    }
                    Json.Append("}");
                    if (i < dt.Rows.Count - 1)
                    {
                        Json.Append(",");
                    }
                }
            }
            Json.Append("]}");
            return Json.ToString();
        }

        /// <summary>
        /// List转成json 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="jsonName"></param>
        /// <param name="IL"></param>
        /// <returns></returns>
        public static string ObjectToJson<T>(string jsonName, IList<T> IL)
        {
            StringBuilder Json = new StringBuilder();
            Json.Append("{\"" + jsonName + "\":[");
            if (IL.Count > 0)
            {
                for (int i = 0; i < IL.Count; i++)
                {
                    T obj = Activator.CreateInstance<T>();
                    Type type = obj.GetType();
                    PropertyInfo[] pis = type.GetProperties();
                    Json.Append("{");
                    for (int j = 0; j < pis.Length; j++)
                    {
                        Json.Append("\"" + pis[j].Name.ToString() + "\":\"" + pis[j].GetValue(IL[i], null) + "\"");
                        if (j < pis.Length - 1)
                        {
                            Json.Append(",");
                        }
                    }
                    Json.Append("}");
                    if (i < IL.Count - 1)
                    {
                        Json.Append(",");
                    }
                }
            }
            Json.Append("]}");
            return Json.ToString();
        }
        /// <summary> 
        /// 对象转换为Json字符串 
        /// </summary> 
        /// <param name="jsonObject">对象</param> 
        /// <returns>Json字符串</returns> 
        public static string ToJson(object jsonObject)
        {
            string jsonString = "{";
            PropertyInfo[] propertyInfo = jsonObject.GetType().GetProperties();
            for (int i = 0; i < propertyInfo.Length; i++)
            {
                object objectValue = propertyInfo[i].GetGetMethod().Invoke(jsonObject, null);
                string value = string.Empty;
                if (objectValue is DateTime || objectValue is Guid || objectValue is TimeSpan)
                {
                    value = "\"" + objectValue.ToString() + "\"";
                }
                else if (objectValue is string)
                {
                    value = "\"" + ToJson(objectValue.ToString()) + "\"";
                }
                else if (objectValue is IEnumerable)
                {
                    value = ToJson((IEnumerable)objectValue);
                }
                else
                {
                    value = ToJson(objectValue.ToString());
                }
                jsonString += "\"" + ToJson(propertyInfo[i].Name) + "\":" + value + ",";
            }
            return DeleteLast(jsonString) + "}";
        }

        /// <summary> 
        /// 对象集合转换Json 
        /// </summary> 
        /// <param name="array">集合对象</param> 
        /// <returns>Json字符串</returns> 
        public static string ToJson(IEnumerable array)
        {
            string jsonString = "[";
            foreach (object item in array)
            {
                jsonString += ToJson(item) + ",";
            }
            return DeleteLast(jsonString) + "]";
        }

        /// <summary> 
        /// 普通集合转换Json 
        /// </summary> 
        /// <param name="array">集合对象</param> 
        /// <returns>Json字符串</returns> 
        public static string ToArrayString(IEnumerable array)
        {
            string jsonString = "[";
            foreach (object item in array)
            {
                jsonString = ToJson(item.ToString()) + ",";
            }
            return DeleteLast(jsonString) + "]";
        }

        /// <summary> 
        /// 删除结尾字符 
        /// </summary> 
        /// <param name="str">需要删除的字符</param> 
        /// <returns>完成后的字符串</returns> 
        private static string DeleteLast(string str)
        {
            if (str.Length > 1)
            {
                return str.Substring(0, str.Length - 1);
            }
            return str;
        }

        /// <summary> 
        /// DataReader转换为Json 
        /// </summary> 
        /// <param name="dataReader">DataReader对象</param> 
        /// <returns>Json字符串</returns> 
        public static string ToJson(DbDataReader dataReader)
        {
            string jsonString = "[";
            while (dataReader.Read())
            {
                jsonString += "{";

                for (int i = 0; i < dataReader.FieldCount; i++)
                {
                    jsonString += "\"" + ToJson(dataReader.GetName(i)) + "\":";
                    if (dataReader.GetFieldType(i) == typeof(DateTime) || dataReader.GetFieldType(i) == typeof(string))
                    {
                        jsonString += "\"" + ToJson(dataReader[i].ToString()) + "\",";
                    }
                    else
                    {
                        jsonString += ToJson(dataReader[i].ToString()) + ",";
                    }
                }
                jsonString = DeleteLast(jsonString) + "}";
            }
            dataReader.Close();
            return DeleteLast(jsonString) + "]";
        }

        /// <summary> 
        /// DataSet转换为Json 
        /// </summary> 
        /// <param name="dataSet">DataSet对象</param> 
        /// <returns>Json字符串</returns> 
        public static string ToJson(DataSet dataSet)
        {
            string jsonString = "{";
            foreach (DataTable table in dataSet.Tables)
            {
                jsonString += "\"" + ToJson(table.TableName) + "\":" + ToJson(table) + ",";
            }
            return jsonString = DeleteLast(jsonString) + "}";
        }

        /// <summary> 
        /// String转换为Json 
        /// </summary> 
        /// <param name="value">String对象</param> 
        /// <returns>Json字符串</returns> 
        public static string ToJson(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return "null";   //update by lj 2012-08-27
                //return string.Empty;
            }

            string temstr;
            temstr = value;
            temstr = temstr.Replace("{", "｛").Replace("}", "｝").Replace(":", "：").Replace(",", "，").Replace("[", "【").Replace("]", "】").Replace(";", "；").Replace("\n", "<br/>").Replace("\r", "");

            temstr = temstr.Replace("\t", "   ");
            temstr = temstr.Replace("'", "\'");
            temstr = temstr.Replace(@"\", @"\\");
            temstr = temstr.Replace("\"", "\"\"");
            return temstr;
        }

        /// <summary> 
        /// Datatable转换为Json 
        /// </summary> 
        /// <param name="table">Datatable对象</param> 
        /// <returns>Json字符串</returns> 
        public static string ToJsonNew(DataTable table)
        {
            StringBuilder jsonString = new StringBuilder();
            jsonString.Append("[");
            DataRowCollection drc = table.Rows;
            for (int i = 0; i < drc.Count; i++)
            {
                jsonString.Append("{");
                int tempindex = 0;
                string strtempvalue = ",";
                foreach (DataColumn column in table.Columns)
                {
                    if (tempindex == table.Columns.Count - 1)
                    {
                        strtempvalue = "";
                    }
                    jsonString.Append("\"" + ToJson(column.ColumnName) + "\":");
                    if (column.DataType == typeof(DateTime))
                    {
                        jsonString.Append("\"" + Convert.ToDateTime(drc[i][column.ColumnName]).ToString("yyyy-MM-dd HH:mm:ss") + "\"" + strtempvalue);
                    }
                    else if (column.DataType == typeof(string))
                    {
                        jsonString.Append("\"" + ToJson(drc[i][column.ColumnName].ToString()) + "\"" + strtempvalue);
                    }
                    else if (column.DataType == typeof(bool))
                    {
                        jsonString.Append("\"" + ToJson(drc[i][column.ColumnName].ToString()) + "\"" + strtempvalue);
                    }
                    else if (column.DataType == typeof(Guid))
                    {
                        jsonString.Append("\"" + ToJson(drc[i][column.ColumnName].ToString()) + "\"" + strtempvalue);
                    }
                    else
                    {
                        jsonString.Append(ToJson(drc[i][column.ColumnName].ToString()) + strtempvalue);
                    }
                    tempindex++;
                }
                if (i == drc.Count - 1)
                {
                    jsonString.Append("}");
                }
                else
                {
                    jsonString.Append("},");
                }
            }
            return jsonString + "]";
        }


        public static string ListToJsonArray(List<string> data)
        {
            string jsonString = "";
            foreach (string o in data)
            {
                jsonString += "\"" + o + "\",";
            }
            if (!string.IsNullOrEmpty(jsonString))
            {
                jsonString = "[" + jsonString.Substring(0, jsonString.Length - 1) + "]";
            }
            return jsonString;
        }

        public static string ListStringToJson(List<string> data)
        {
            string jsonString = "";
            foreach (string o in data)
            {
                jsonString += o + ",";
            }
            if (!string.IsNullOrEmpty(jsonString))
            {
                jsonString = "[" + jsonString.Substring(0, jsonString.Length - 1) + "]";
            }
            return jsonString;
        }

        /// <summary>
        /// json to xml
        /// </summary>
        /// <param name="sJson"></param>
        /// <returns></returns>
        public static XmlDocument Json2Xml(string sJson)
        {
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            Dictionary<string, object> Dic = (Dictionary<string, object>)oSerializer.DeserializeObject(sJson);
            XmlDocument doc = new XmlDocument();
            XmlDeclaration xmlDec;
            xmlDec = doc.CreateXmlDeclaration("1.0", "gb2312", "yes");
            doc.InsertBefore(xmlDec, doc.DocumentElement);
            //XmlElement nRoot = doc.CreateElement("Config");
            //doc.AppendChild(nRoot);
            foreach (KeyValuePair<string, object> item in Dic)
            {
                if (item.Key.ToLower() == "data")
                {
                    XmlElement element = doc.CreateElement("Config");
                    KeyValue2Xml(element, item);
                    doc.AppendChild(element);
                }
            }
            return doc;
        }

        private static void KeyValue2Xml(XmlElement node, KeyValuePair<string, object> Source)
        {
            object kValue = Source.Value;
            if (kValue != null && kValue.GetType() == typeof(Dictionary<string, object>))
            {
                foreach (KeyValuePair<string, object> item in kValue as Dictionary<string, object>)
                {
                    XmlElement element = node.OwnerDocument.CreateElement(item.Key);
                    KeyValue2Xml(element, item);
                    node.AppendChild(element);
                }
            }
            else if (kValue != null && kValue.GetType() == typeof(object[]))
            {
                object[] o = kValue as object[];
                for (int i = 0; i < o.Length; i++)
                {
                    XmlElement xitem = node.OwnerDocument.CreateElement(Source.Key);
                    KeyValuePair<string, object> item = new KeyValuePair<string, object>(Source.Key, o[i]);
                    KeyValue2Xml(xitem, item);
                    node.AppendChild(xitem);
                }

            }
            else
            {
                try
                {
                    XmlText text = node.OwnerDocument.CreateTextNode(kValue.ToString());
                    node.AppendChild(text);
                }
                catch { }
            }
        }
    }
}