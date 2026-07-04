// Bài tập luyện JavaScript cơ bản

// Bài 1: Khai báo biến lưu tên, tuổi và in ra câu giới thiệu
let ten = 'Đặng Thị Trâm Anh';
let tuoi = 20;
console.log('Xin chào, tôi tên là ' + ten + ', ' + tuoi + ' tuổi');

//Bài 2: Tính tổng hai số và in kết quả.
let a = 5.3;
let b = 3.7;
let tong = a + b;
console.log('Tổng của hai số là: ' + tong);
console.log('Tổng của hai số là: ' + (a + b));

// Bài 3: Kiểm tra một số là chẵn hay lẻ.
let a = 7;
if (a % 2 === 0) 
{
    console.log(a + ' là số chẵn');
} 
else 
{
    console.log(a + ' là số lẻ');
}
// Bài 4: Tìm số lớn nhất trong một mảng số.
function timSoLonNhat(array)
{
    let max = array[0];
    for (let i = 1; i < array.length; i++) 
    { 
        if (array[i] > max)
        {
            max = array[i];
        }
    }
    return max;
}
let max = timSoLonNhat([3, 7, 2, 9, 5]);
console.log(max + ' là số lớn nhất trong mảng');

// Bài 5: Tính tổng các phần tử trong mảng.
function tinhTongMang(array)
{
    let tong = 0;
    for (let i = 0; i < array.length; i++) 
    {
        tong += array[i];
    }
    return tong;
}
let tong = tinhTongMang([3, 7, 2, 9, 5]);
console.log(tong + ' là tổng các phần tử trong mảng');

// Bài 6: Đếm số phần tử lớn hơn 10 trong mảng.
let dem = 0;
let array = [3, 7, 12, 9, 15];
for (let i = 0; i < array.length; i++)
{
    if (array[i] > 10)
    {
        dem++;
    }
}
console.log('Có ' + dem + ' phần tử lớn hơn 10 trong mảng');

// Bài 7: Viết hàm đảo ngược một chuỗi.
let chuoi = 'Hello, World!';
function daoNguocChuoi(chuoi)
{
    let chuoiDaoNguoc = '';
    for (let i = chuoi.length - 1; i >= 0; i--)
    {
        chuoiDaoNguoc += chuoi[i];
    }
    return chuoiDaoNguoc;
}
let chuoiDaoNguoc = daoNguocChuoi(chuoi);
console.log(chuoiDaoNguoc + ' là chuỗi đảo ngược của ' + chuoi);

// Bài 8: Lọc ra các số dương từ một mảng hỗn hợp.
let array = [3, -7, 12, -9, 15];
let duong = [];
for (let i = 0; i < array.length; i++)
{
    if (array[i] > 0)
    {
        duong.push(array[i]);
    }
}
console.log(duong + ' là các số dương trong mảng');

// Bài 9: Đếm số lần xuất hiện của một ký tự trong chuỗi.
let chuoi = 'Hello, World!';
let kyTu = 'l';
let dem = 0;
for (let i = 0; i < chuoi.length; i++)
{
    if (chuoi[i] === kyTu)
    {
        dem++;
    }
}
console.log('Ký tự ' + kyTu + ' xuất hiện ' + dem + ' lần trong chuỗi ' + '"' + chuoi + '"');

// Bài 10: Viết hàm quản lý danh sách sinh viên: thêm, sửa, xóa.
function QuanLySinhVien()
{
    let danhSachSinhVien = [];
    this.themSinhVien = function (ten, tuoi)
    {
        danhSachSinhVien.push({ ten: ten, tuoi: tuoi });
    }
    this.suaSinhVien = function (ten, tuoi)
    {
        for (let i = 0; i < danhSachSinhVien.length; i++)
        {
            if (danhSachSinhVien[i].ten === ten)
            {
                danhSachSinhVien[i].tuoi = tuoi;
                break;
            }
        }
    }
    this.xoaSinhVien = function (ten)
    {
        danhSachSinhVien = danhSachSinhVien.filter(function (sinhVien)
        {
            return sinhVien.ten !== ten;
        });
    }
    this.layDanhSachSinhVien = function ()
    {
        return danhSachSinhVien;
    }
}
let quanLy = new QuanLySinhVien();
quanLy.themSinhVien('Đặng Thị Trâm Anh', 20);
quanLy.themSinhVien('Nguyễn Văn A', 22);
console.log(quanLy.layDanhSachSinhVien());
quanLy.suaSinhVien('Nguyễn Văn A', 23);
console.log(quanLy.layDanhSachSinhVien());
quanLy.xoaSinhVien('Đặng Thị Trâm Anh');
console.log(quanLy.layDanhSachSinhVien());