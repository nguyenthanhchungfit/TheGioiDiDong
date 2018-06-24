
-- 22-06-2018
ALTER TABLE dien_thoai
ADD COLUMN duoc_ban boolean default true;

ALTER TABLE laptop
ADD COLUMN duoc_ban boolean default true;

ALTER TABLE tablet
ADD COLUMN duoc_ban boolean default true;