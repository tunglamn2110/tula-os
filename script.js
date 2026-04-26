// CHỈ KHAI BÁO MỘT LẦN DUY NHẤT
const _supabaseUrl = 'https://aswhvxuznjoibotxjyis.supabase.co';
const _supabaseKey = 'sb_publishable_rXTkn-Z7tWXFMGS1ZIkJ6w_EBb5WWbV'; 
const _supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

async function initRoadmap() {
    console.log("Tula OS: Đang kết nối Cloud...");

    // 1. Tải dữ liệu
    const { data: tasks, error } = await _supabase.from('roadmap_tasks').select('*');
    if (error) {
        console.error('Lỗi kết nối:', error.message);
        return;
    }

    // 2. Hiển thị trạng thái đã tích
    tasks.forEach(task => {
        const el = document.querySelector(`[data-task-id="${task.task_id}"]`);
        if (el && task.is_completed) {
            el.classList.add('checked');
        }
    });

    // 3. Gắn sự kiện click để lưu
    const checkboxes = document.querySelectorAll('[data-task-id]');
    console.log("Tìm thấy checkbox:", checkboxes.length);

    checkboxes.forEach(box => {
        box.onclick = async () => {
            const taskId = box.getAttribute('data-task-id');
            const isChecked = box.classList.toggle('checked');

            console.log(`Đang lưu ${taskId}...`);

            const { error: updateError } = await _supabase
                .from('roadmap_tasks')
                .update({ is_completed: isChecked })
                .eq('task_id', taskId);

            if (updateError) {
                console.error('Lưu lỗi:', updateError.message);
                box.classList.toggle('checked'); // Trả lại màu cũ nếu lỗi
            }
        };
    });
}

// Đợi trang web sẵn sàng mới chạy
document.addEventListener('DOMContentLoaded', initRoadmap);