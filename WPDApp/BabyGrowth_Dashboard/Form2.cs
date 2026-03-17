using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace BabyGrowth_Dashboard
{
    public partial class Form2 : Form
    {
        private static readonly HttpClient client = new HttpClient();

        public Form2()
        {
            InitializeComponent();

        }

        // Click event for Save button
        private async void btnSave_Click(object sender, EventArgs e)
        {
            // Validate form input
            if (string.IsNullOrEmpty(txtName.Text) || string.IsNullOrEmpty(txtEmail.Text) || string.IsNullOrEmpty(txtPassword.Text))
            {
                MessageBox.Show("Please fill in all fields.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            // Get data from textboxes
            var user = new
            {
                name = txtName.Text,
                email = txtEmail.Text,
                password = txtPassword.Text
            };

            // Prepare the POST request content
            var content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

            try
            {
                // Send POST request to Node.js API
                var response = await client.PostAsync("http://localhost:5000/api/signup", content);

                // Check if the response was successful
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("User added successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                else
                {
                    MessageBox.Show("Failed to add user. Please try again.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "API Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Form2_Load(object sender, EventArgs e)
        {

        }

        private void txtName_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
