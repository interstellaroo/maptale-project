from django.db import models
from polymorphic.models import PolymorphicModel
import uuid
from mptt.models import MPTTModel, TreeForeignKey
from project_mgmt.models import Project

class Node(MPTTModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='children')
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class MPTTMeta:
        order_insertion_by = ['name']

    def __str__(self):
        return self.name

class BaseItem(PolymorphicModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Note(BaseItem):
    text = models.TextField()

    def __str__(self):
        return f"Note: {self.name}"


class Map(BaseItem):
    image = models.ImageField(upload_to='images/') 

    def __str__(self):
        return f"Map: {self.name}"

    