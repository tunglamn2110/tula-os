
const _supabaseKey = 'sb_publishable_rXTkn-Z7tWXFMGS1ZIkJ6w_EBb5WWbV';
const _supabaseUrl = 'https://aswhvxuznjoibotxjyis.supabase.co';
const _supabaseKey = 'sb_publishable_rXTkn-Z7tWXFMGS1ZIkJ6w_EBb5WWbV';
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

// Hàm này sẽ chạy ngay khi trình duyệt đọc đến nó
console.log("Tula OS: Script đang khởi động...");

async function init() {
    const boxes = document.querySelectorAll('[data-task-id]');
    console.log("Tìm thấy số lượng checkbox là:", boxes.length);

    if (boxes.length === 0) {
        console.error("LỖI: Không tìm thấy ô nào có data-task-id. Kiểm tra lại HTML!");
    }

    boxes.forEach(box => {
        // Gắn sự kiện click thủ công
        box.onclick = async () => {
            console.log("Bạn vừa bấm vào:", box.getAttribute('data-task-id'));
            
            // 1. Đổi màu UI trước cho sướng mắt
            const isChecked = box.classList.toggle('checked');

            // 2. Lưu lên Database sau
            const { error } = await supabase
                .from('roadmap_tasks')
                .update({ is_completed: isChecked })
                .eq('task_id', box.getAttribute('data-task-id'));

            if (error) console.error("Lưu thất bại:", error.message);
            else console.log("Lưu thành công lên mây!");
        };
    });
}

// Đợi 1 chút cho HTML load xong hẳn rồi mới chạy
setTimeout(init, 500);