
-- 22-06-2018
ALTER TABLE dien_thoai
ADD COLUMN duoc_ban boolean default true;

ALTER TABLE laptop
ADD COLUMN duoc_ban boolean default true;

ALTER TABLE tablet
ADD COLUMN duoc_ban boolean default true;



-- 26-06-2018
-- Xóa bảng hình cũ, insert hình mới
-- hinh
INSERT INTO hinh(ma_thiet_bi, ma_hinh)
VALUES ('TDT000', 'DT000_0000.png'),
('TDT000', 'DT000_0001.jpg'),
('TDT000', 'DT000_0002.jpg'),
('TDT001', 'DT001_0000.png'),
('TDT001', 'DT001_0001.jpg'),
('TDT001', 'DT001_0002.jpg'),
('TDT002', 'DT002_0000.png'),
('TDT002', 'DT002_0001.jpg'),
('TDT002', 'DT002_0002.jpg'),
('TDT003', 'DT003_0000.png'),
('TDT003', 'DT003_0001.jpg'),
('TDT003', 'DT003_0002.jpg'),
('TDT004', 'DT004_0000.png'),
('TDT004', 'DT004_0001.jpg'),
('TDT004', 'DT004_0002.jpg'),
('TLT000', 'LT000_0000.jpg'),
('TLT000', 'LT000_0001.jpg'),
('TLT000', 'LT000_0002.jpg'),
('TLT001', 'LT001_0000.jpg'),
('TLT001', 'LT001_0001.jpg'),
('TLT001', 'LT001_0002.jpg'),
('TLT002', 'LT002_0000.jpg'),
('TLT002', 'LT002_0001.jpg'),
('TLT002', 'LT002_0002.jpg'),
('TLT003', 'LT003_0000.jpg'),
('TLT003', 'LT003_0001.jpg'),
('TLT003', 'LT003_0002.jpg'),
('TLT004', 'LT004_0000.jpg'),
('TLT004', 'LT004_0001.jpg'),
('TLT004', 'LT004_0002.jpg'),
('TTL000', 'TL000_0000.png'),
('TTL000', 'TL000_0001.jpg'),
('TTL000', 'TL000_0002.jpg'),
('TTL001', 'TL001_0000.png'),
('TTL001', 'TL001_0001.jpg'),
('TTL001', 'TL001_0002.jpg'),
('TTL002', 'TL002_0000.png'),
('TTL002', 'TL002_0001.jpg'),
('TTL002', 'TL002_0002.jpg'),
('TTL003', 'TL003_0000.png'),
('TTL003', 'TL003_0001.jpg'),
('TTL003', 'TL003_0002.jpg'),
('TTL004', 'TL004_0000.png'),
('TTL004', 'TL004_0001.jpg'),
('TTL004', 'TL004_0002.jpg'),
('TDT005', 'DT005_0000.png'),
('TDT005', 'DT005_0001.jpg'),
('TDT005', 'DT005_0002.jpg'),
('TDT006', 'DT006_0000.png'),
('TDT006', 'DT006_0001.jpg'),
('TDT006', 'DT006_0002.jpg'),
('TDT007', 'DT007_0000.png'),
('TDT007', 'DT007_0001.jpg'),
('TDT007', 'DT007_0002.jpg'),
('TDT008', 'DT008_0000.png'),
('TDT008', 'DT008_0001.jpg'),
('TDT008', 'DT008_0002.jpg'),
('TDT009', 'DT009_0000.jpg'),
('TDT009', 'DT009_0001.png'),
('TDT009', 'DT009_0002.jpg'),
('TLT005', 'LT005_0000.jpg'),
('TLT005', 'LT005_0001.jpg'),
('TLT005', 'LT005_0002.jpg'),
('TLT006', 'LT006_0000.jpg'),
('TLT006', 'LT006_0001.jpg'),
('TLT006', 'LT006_0002.jpg'),
('TLT007', 'LT007_0000.jpg'),
('TLT007', 'LT007_0001.jpg'),
('TLT007', 'LT007_0002.jpg'),
('TLT008', 'LT008_0000.jpg'),
('TLT008', 'LT008_0001.jpg'),
('TLT008', 'LT008_0002.jpg'),
('TLT009', 'LT009_0000.jpg'),
('TLT009', 'LT009_0001.jpg'),
('TLT009', 'LT009_0002.jpg'),
('TTL005', 'TL005_0000.png'),
('TTL005', 'TL005_0001.jpg'),
('TTL005', 'TL005_0002.jpg'),
('TTL006', 'TL006_0000.png'),
('TTL006', 'TL006_0001.jpg'),
('TTL006', 'TL006_0002.jpg'),
('TTL007', 'TL007_0000.png'),
('TTL007', 'TL007_0001.jpg'),
('TTL007', 'TL007_0002.jpg'),
('TTL008', 'TL008_0000.png'),
('TTL008', 'TL008_0001.jpg'),
('TTL008', 'TL008_0002.jpg'),
('TTL009', 'TL009_0000.png'),
('TTL009', 'TL009_0001.jpg'),
('TTL009', 'TL009_0002.jpg');

-- 28-06-2018
INSERT INTO account 
  VALUES ("thanhchungKH1", "123456", 1),
  ("thanhchungKH2", "123456", 1),
  ("thanhchungNV1", "123456", 2),
  ("thanhchungNV2", "123456", 2),
  ("thanhchungQL1", "123456", 3),
  ("thanhchungQL2", "123456", 3)