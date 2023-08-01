use std::collections::HashMap;

struct Did {
    id: String,
    document: HashMap<String, String>,
}

impl Did {
    fn new(id: String) -> Did {
        Did {
            id,
            document: HashMap::new(),
        }
    }

    fn add_property(&mut self, key: String, value: String) {
        self.document.insert(key, value);
    }

    fn get_property(&self, key: &str) -> Option<&String> {
        self.document.get(key)
    }
}

fn main() {
    let did = Did::new("did:example:1234567890");
    did.add_property("name", "John Doe");
    did.add_property("email", "john.doe@example.com");

    println!("{}", did.id);
    println!("{:?}", did.document);

    if let Some(value) = did.get_property("name") {
        println!("Name: {}", value);
    }

    if let Some(value) = did.get_property("email") {
        println!("Email: {}", value);
    }
}