using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace daservice
{
    public class Comm
    {
        /// <summary>
        /// 将消息输出到客户端
        /// </summary>
        /// <param name="StrContent">输出内容</param>
        public static void Output(string StrContent)
        {
            System.Web.HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");   //跨域策略
            HttpRequest Request = HttpContext.Current.Request;
            string callback = Request["callback"];
            HttpResponse Response = HttpContext.Current.Response;
            Encoding utf8 = Encoding.GetEncoding("utf-8");
            Response.ContentEncoding = utf8;
            Response.Write(callback + "(" + StrContent + ")");  //此方法是在jquery.min.js版本中使用
            //Response.Write(StrContent);
            //Response.End();   //线程正在终止
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }

        public static void OutPutjson(string strcontent)
        {
            System.Web.HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");   //跨域策略
            HttpRequest Request = HttpContext.Current.Request;
            string callback = Request["callback"];
            HttpResponse Response = HttpContext.Current.Response;
            Encoding utf8 = Encoding.GetEncoding("utf-8");
            Response.ContentEncoding = utf8;
            Response.Write(strcontent);
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }

        public static void ResultOK()
        {
            string result = "{ \"result\" : \"true\",\"message\":\"执行成功\" }";
            Output(result);
        }

        public static void ResultError(string ErrorMsg)
        {
            string result = "{ \"result\" : \"false\", \"message\" : \"" + ErrorMsg + "\" }";
            Output(result);
        }

        /// <summary>
        /// 检查文件是否存在
        /// </summary>
        /// <param name="FilePath">文件完整路径</param>
        /// <returns></returns>
        public static bool IsFileExist(string FilePath)
        {
            return File.Exists(FilePath);
        }

        /// <summary>
        /// 获取文件名称
        /// </summary>
        /// <param name="path">文件路径</param>
        /// <param name="FileAllName">文件路径+文件名</param>
        /// <returns></returns>
        public static string GetFileName(string path, string FileAllName)
        {
            string temp = FileAllName.Replace(path, "");
            return temp = temp.Substring(0, temp.LastIndexOf("."));
        }
    }
}