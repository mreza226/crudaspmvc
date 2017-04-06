using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;

namespace TestApp.Models
{
    public class employeeDB
    {
        string cs = ConfigurationManager.ConnectionStrings["EDB"].ConnectionString;
        private SqlConnection con;
        public List<employee> getAllEmployee()
        {
            List<employee> lst = new List<employee>();
            using (con=new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SELECT * From employee", con);
                SqlDataReader reader = com.ExecuteReader();               

                while (reader.Read())
                {
                    lst.Add(new employee
                    {
                        id = Convert.ToInt32(reader["id"]),
                        nama = reader["nama"].ToString(),
                        status = reader["status"].ToString(),
                        airport = reader["airport"].ToString(),
                        company = reader["company"].ToString(),
                        tgl_daftar = reader["tgl_daftar"].ToString(),
                        //barcode = reader["barcode"].ToString()
                    });
                }

                return lst;
            }            
        }     

        public int Add(employee insert)
        {
            int i;            
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("insert into employee (nama,status,airport,company) values (@nama,@status,@airport,@company)", con);
                //com.CommandType = CommandType.StoredProcedure;
                con.Open();
                //cmd.Parameters.AddWithValue("@id", insert.id);
                cmd.Parameters.AddWithValue("@nama", insert.nama);
                cmd.Parameters.AddWithValue("@status", insert.status);
                cmd.Parameters.AddWithValue("@airport", insert.airport);
                cmd.Parameters.AddWithValue("@company", insert.company);
                //cmd.Parameters.AddWithValue("@time", insert.tgl_daftar);
                //cmd.Parameters.AddWithValue("@barcode", insert.barcode); 
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(employee update)
        {
            int i;
            using (con=new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Update employee set nama=@nama,status=@status,airport=@airport,company=@company where id=@id", con);                
                cmd.Parameters.AddWithValue("@id", update.id);
                cmd.Parameters.AddWithValue("@nama", update.nama);
                cmd.Parameters.AddWithValue("@status", update.status);
                cmd.Parameters.AddWithValue("@airport", update.airport);
                cmd.Parameters.AddWithValue("@company", update.company);
                //cmd.Parameters.AddWithValue("@tgl_daftar", update.tgl_daftar);
                //cmd.Parameters.AddWithValue("@barcode", update.barcode);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int id)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("delete employee where id=@id", con);
                //com.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
    }

}