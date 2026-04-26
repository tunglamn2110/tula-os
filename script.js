// Khai báo thông tin kết nối
const _supabaseUrl = 'https://aswhvxuznjoibotxjyis.supabase.co';
const _supabaseKey = 'sb_publishable_rXTkn-Z7tWXFMGS1ZIkJ6w_EBb5WWbV';
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

// Hàm mẫu để lấy dữ liệu từ bảng (Ví dụ bảng của bạn tên là 'projects')
async function getMyData() {
    const { data, error } = await supabase
        .from('projects') // Thay 'projects' bằng tên bảng bạn đã tạo
        .select('*');

    if (error) {
        console.error('Lỗi lấy data:', error);
    } else {
        console.log('Dữ liệu của bạn:', data);
        // Sau đó bạn dùng data này để render ra HTML bằng JS
    }
}

// Gọi hàm chạy thử
getMyData();