create_table "done_task_notes", id: :integer, default: 0, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
  t.bigint "task_id", null: false
  t.bigint "user_id", null: false
  t.string "note", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
end
