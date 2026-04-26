// Khai báo thông tin kết nối
const _supabaseUrl = 'https://aswhvxuznjoibotxjyis.supabase.co';
const _supabaseKey = 'sb_publishable_rXTkn-Z7tWXFMGS1ZIkJ6w_EBb5WWbV';
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

async function initRoadmap() {
    // 1. Lấy toàn bộ trạng thái từ Supabase về
    const { data: tasks, error } = await supabase.from('roadmap_tasks').select('*');
    if (error) return console.error('Lỗi tải data:', error);

    // 2. Render trạng thái lên giao diện
    tasks.forEach(task => {
        const el = document.querySelector(`[data-task-id="${task.task_id}"]`);
        if (el && task.is_completed) {
            el.classList.add('checked');
        }
    });

    // 3. Lắng nghe sự kiện click cho tất cả checkbox
    const allCheckBoxes = document.querySelectorAll('[data-task-id]');
    allCheckBoxes.forEach(box => {
        box.addEventListener('click', async () => {
            // Hiệu ứng tích/bỏ tích trên UI
            const isChecked = box.classList.toggle('checked');
            const taskId = box.getAttribute('data-task-id');

            // Lưu trạng thái mới lên Supabase
            const { error: updateError } = await supabase
                .from('roadmap_tasks')
                .update({ is_completed: isChecked })
                .eq('task_id', taskId);

            if (updateError) {
                console.error('Lỗi lưu:', updateError);
                box.classList.toggle('checked'); // Trả lại trạng thái cũ nếu lỗi
            }
        });
    });
}

// Chạy khi trang web load xong
document.addEventListener('DOMContentLoaded', initRoadmap);