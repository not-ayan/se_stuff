import os
import re
import json

def parse_course_data():
    with open('src/data/courseData.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"Read src/data/courseData.ts ({len(content)} bytes)")
    # Simple check for modules and topics
    mod_blocks = content.split("id: 'mod-")
    print(f"Found {len(mod_blocks)-1} module blocks")
    
    total_topics = 0
    for idx, block in enumerate(mod_blocks[1:], 1):
        lines = block.split('\n')
        title_line = [l for l in lines if 'title:' in l]
        title = title_line[0].split("'")[1] if title_line else f"Module {idx}"
        topic_count = block.count("id: 'topic-")
        total_topics += topic_count
        print(f"Module {idx}: {title} -> {topic_count} topics")

    print(f"Total topics across all modules: {total_topics}")

if __name__ == '__main__':
    parse_course_data()
